import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));
function load(filename, mocks = {}, fetchMock) {
  const code = ts.transpileModule(fs.readFileSync(path.join(sourceRoot, filename), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'process', 'fetch', code)(name => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    return require(name);
  }, compiled, compiled.exports, { env: { NEXT_PUBLIC_API_BASE_URL: 'https://api.example.test' } }, fetchMock);
  return compiled.exports;
}

const urls = load('lib/localizedUrls.ts');
const seo = load('lib/seo.ts');
const LegalDocument = load('components/LegalDocument.tsx', {
  '@/styles/LegalDocument.module.css': {},
}).default;

test('language destinations preserve page paths, encoded segments, and queries', () => {
  assert.equal(urls.buildLanguageHref('/en', 'he'), '/he');
  assert.equal(urls.buildLanguageHref('/he/our-team', 'ka', 'utm_source=test&view=full'), '/ka/our-team?utm_source=test&view=full');
  assert.equal(urls.buildLanguageHref('/es/terms-of-service', 'ru'), '/ru');
  assert.equal(urls.buildLanguageHref('/ka/team/member-%26-name', 'es', '?view=full'), '/es/team/member-%26-name?view=full');
  assert.equal(urls.buildLanguageHref('/en/our-team/', 'zh'), '/zh/our-team');
});

test('article language links use destination listings rather than nonexistent translations', () => {
  for (const source of ['/en/blog/post-id', '/en/blog/post-id/a-title', '/en/blog/post-id/%E1%83%90']) {
    assert.equal(urls.buildLanguageHref(source, 'ka', 'utm_source=test'), '/ka/blog?utm_source=test');
  }
  assert.equal(urls.buildLanguageHref('/en/blog', 'he'), '/he/blog');
});

function switcher(pathname, search) {
  return load('components/Navigation/LanguageSwitcher.tsx', {
    'next/navigation': {
      usePathname: () => pathname,
      useSearchParams: () => { if (search === null) throw new Promise(() => {}); return new URLSearchParams(search); },
    },
    'next/link': props => React.createElement('a', {
      href: props.href, hrefLang: props.hrefLang, lang: props.lang, dir: props.dir,
      className: props.className, onClick: props.onClick,
    }, props.children),
    'react-country-flag': () => React.createElement('span', { 'aria-hidden': true }),
    '@/lib/localizedUrls': urls,
    '@/styles/Navigation/LanguageSwitcher.module.css': {},
  }).default;
}

test('closed native dropdown contains five crawlable links for desktop and mobile', () => {
  for (const isMobile of [false, true]) {
    const Switcher = switcher('/he/our-team', 'view=full');
    const html = renderToStaticMarkup(React.createElement(Switcher, { isMobile }));
    assert.ok(html.includes('<details'));
    assert.ok(html.includes('<summary'));
    assert.ok(!html.includes('<button'));
    assert.equal((html.match(/<a /g) || []).length, 5);
    for (const locale of ['en', 'ka', 'ru', 'zh', 'es']) {
      assert.ok(html.includes(`href="/${locale}/our-team?view=full"`));
    }
    assert.ok(html.includes('Select language, current: עברית'));
  }
});

test('static Suspense fallback retains actual language links', () => {
  const Switcher = switcher('/en/our-team', null);
  const html = renderToString(React.createElement(Switcher, {}));
  assert.ok(html.includes('<details'));
  assert.equal((html.match(/<a /g) || []).length, 5);
  assert.ok(html.includes('href="/he/our-team"'));
});

test('policy language switches lead to localized homepages until translations exist', () => {
  for (const route of ['privacy-policy', 'terms-of-service']) {
    assert.equal(urls.buildLanguageHref(`/en/${route}`, 'he', 'view=full'), '/he?view=full');
  }
});

for (const locale of urls.SUPPORTED_LOCALES) {
  for (const route of ['privacy-policy', 'terms-of-service']) {
    test(`${locale}: ${route} remains English and canonicalizes to the English original`, async () => {
      const Page = load(`app/[locale]/(pages)/${route}/page.tsx`, {
        '@/components/LegalDocument': LegalDocument, '@/lib/seo': seo,
      });
      const props = { params: Promise.resolve({ locale }) };
      const html = renderToStaticMarkup(await Page.default(props));
      assert.ok(html.includes('lang="en"'));
      assert.ok(html.includes('dir="ltr"'));
      assert.ok(html.includes('Effective: September 15, 2026'));
      assert.equal((html.match(/<h2>/g) || []).length, 8);
      assert.ok(html.includes('info@surrogationcenter.com'));
      assert.ok(html.includes('+995 596 235 050'));
      const metadata = await Page.generateMetadata(props);
      const canonical = `https://www.ivftourgeorgia.com/en/${route}`;
      assert.equal(metadata.alternates.canonical, canonical);
      assert.deepEqual(metadata.alternates.languages, { en: canonical, 'x-default': canonical });
      assert.equal(metadata.openGraph.url, canonical);
      assert.equal(metadata.openGraph.locale, 'en_US');
    });
  }
}

test('sitemap lists only the two canonical English policies', async () => {
  const sitemap = load('app/sitemap.ts', {
    '@/lib/blogUrls': {}, '@/lib/seo': seo,
  }, async () => ({ ok: true, json: async () => [] })).default;
  const entries = (await sitemap()).filter(entry => /\/(privacy-policy|terms-of-service)$/.test(entry.url));
  assert.deepEqual(entries.map(entry => entry.url).sort(), [
    'https://www.ivftourgeorgia.com/en/privacy-policy',
    'https://www.ivftourgeorgia.com/en/terms-of-service',
  ]);
  assert.ok(entries.every(entry => !entry.alternates));
});
