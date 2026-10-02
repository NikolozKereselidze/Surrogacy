import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const sourceRequire = createRequire(import.meta.url);
const testDirectory = path.dirname(fileURLToPath(import.meta.url));

function load(filename, mocks = {}, environment = {}, fetchMock) {
  const source = fs.readFileSync(path.join(testDirectory, '../src', filename), 'utf8');
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const compiledModule = { exports: {} };
  new Function('require', 'module', 'exports', 'process', 'fetch', code)(
    name => Object.hasOwn(mocks, name) ? mocks[name] : sourceRequire(name),
    compiledModule, compiledModule.exports, { env: environment }, fetchMock,
  );
  return compiledModule.exports;
}

const urls = load('lib/blogUrls.ts');
const titles = [
  ['en', 'How Long Does Surrogacy Take?', 'how-long-does-surrogacy-take'],
  ['ka', 'სუროგაცია საქართველოში', 'სუროგაცია-საქართველოში'],
  ['ru', 'Суррогатное материнство', 'суррогатное-материнство'],
  ['zh', '格鲁吉亚代孕', '格鲁吉亚代孕'],
  ['he', 'פונדקאות בגאורגיה', 'פונדקאות-בגאורגיה'],
  ['es', 'Donación de Óvulos', 'donación-de-óvulos'],
];

for (const [locale, title, expected] of titles) {
  test(`${locale}: title produces a nonempty slug and one encoded URL segment`, () => {
    assert.equal(urls.buildBlogSlug(title), expected);
    const route = urls.buildBlogPath(locale, 'article-id', title);
    const segments = route.split('/');
    assert.equal(segments.length, 5);
    assert.equal(decodeURIComponent(segments[4]), expected);
    assert.equal(new URL(route, 'https://example.com').pathname, route);
  });
}

test('blank, punctuation, and emoji-only titles have a routable fallback', () => {
  for (const title of ['', '   ', '!!!', '👶 ❤️']) {
    assert.equal(urls.buildBlogSlug(title), 'post');
    assert.equal(urls.buildBlogPath('en', 'id', title), '/en/blog/id/post');
  }
});
test('Unicode normalization keeps equivalent accented titles canonical', () => {
  assert.equal(urls.buildBlogSlug('Óvulos'), urls.buildBlogSlug('O\u0301vulos'));
  assert.equal(urls.buildBlogSlug('פֻּנְדָּקָאוּת'), 'פֻּנְדָּקָאוּת');
});
test('URL delimiters in a title cannot create extra route segments or queries', () => {
  assert.equal(urls.buildBlogPath('en', 'id', 'Family / IVF? #Help & Care'), '/en/blog/id/family-ivf-help-care');
});

function routeModule(filename, post) {
  return load(filename, {
    'next/navigation': {
      notFound() { throw new Error('NOT_FOUND'); },
      permanentRedirect(url) { throw new Error('REDIRECT:' + url); },
    },
    '@/lib/blogUrls': urls,
    '@/lib/seo': { BASE_URL: 'https://example.com' },
    '@/styles/Blog/Blog.module.css': {},
    '@/components/Blog/BlogPostHeader': () => null,
  }, { NEXT_PUBLIC_API_BASE_URL: 'https://api.example.com' }, async () => ({ ok: true, json: async () => post }));
}
const articleFile = 'app/[locale]/(blog)/blog/[id]/[slug]/page.tsx';
const legacyFile = 'app/[locale]/(blog)/blog/[id]/page.tsx';

test('translated article renders at its canonical slug, with matching metadata', async () => {
  for (const [locale, title] of titles) {
    const article = routeModule(articleFile, { id: 'id', language: locale, title, content: '<p>Test</p>' });
    const params = Promise.resolve({ id: 'id', locale, slug: urls.buildBlogSlug(title) });
    assert.ok(await article.default({ params }));
    const metadata = await article.generateMetadata({ params });
    assert.equal(metadata.alternates.canonical, 'https://example.com' + urls.buildBlogPath(locale, 'id', title));
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  }
});
test('old ASCII-only slug redirects to the translated canonical URL', async () => {
  const post = { id: 'id', language: 'es', title: 'Donación de Óvulos' };
  const article = routeModule(articleFile, post);
  await assert.rejects(article.default({ params: Promise.resolve({ id: 'id', locale: 'es', slug: 'donaci-n-de-vulos' }) }), {
    message: 'REDIRECT:' + urls.buildBlogPath('es', 'id', post.title),
  });
});
test('legacy article URL without a slug redirects to the actual post language and slug', async () => {
  const post = { id: 'id', language: 'ka', title: 'სუროგაცია საქართველოში' };
  const legacy = routeModule(legacyFile, post);
  await assert.rejects(legacy.default({ params: Promise.resolve({ id: 'id', locale: 'en' }) }), {
    message: 'REDIRECT:' + urls.buildBlogPath('ka', 'id', post.title),
  });
});
test('unknown articles remain 404s on legacy URLs', async () => {
  const legacy = routeModule(legacyFile, null);
  await assert.rejects(legacy.default({ params: Promise.resolve({ id: 'missing', locale: 'en' }) }), { message: 'NOT_FOUND' });
});
test('sitemap uses the same canonical URLs as article metadata', async () => {
  const posts = titles.map(([language, title], index) => ({ id: 'id-' + index, language, title }));
  const sitemap = load('app/sitemap.ts', {
    '@/lib/blogUrls': urls, '@/lib/seo': { BASE_URL: 'https://example.com' },
  }, { NEXT_PUBLIC_API_BASE_URL: 'https://api.example.com' }, async url => ({
    ok: true, json: async () => url.endsWith('/api/blog') ? posts : [],
  })).default;
  const entries = (await sitemap()).filter(entry => entry.url.includes('/blog/'));
  assert.equal(entries.length, posts.length);
  for (const post of posts) {
    const canonical = 'https://example.com' + urls.buildBlogPath(post.language, post.id, post.title);
    const entry = entries.find(value => value.url === canonical);
    assert.ok(entry);
    assert.equal(entry.alternates.languages[post.language], canonical);
  }
});
