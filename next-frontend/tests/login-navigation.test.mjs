import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const code = ts.transpileModule(
  fs.readFileSync(new URL('../src/components/Login.tsx', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
).outputText;

function harness(isAdmin, fetchMock) {
  const navigations = [];
  const state = [];
  let index = 0;
  const mocks = {
    react: { Suspense: () => null, useState(initial) {
      const key = index++;
      if (!(key in state)) state[key] = initial;
      return [state[key], value => { state[key] = value; }];
    } },
    'next/image': () => null,
    'next/link': () => null,
    '@/styles/Login.module.css': {},
  };
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'fetch', 'window', code)(
    name => Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    compiled, compiled.exports, fetchMock,
    { location: { replace: url => navigations.push(url) } },
  );
  const render = () => {
    index = 0;
    const content = compiled.exports.default({ isAdmin }).props.children;
    return content.type(content.props);
  };
  function find(node, predicate) {
    if (Array.isArray(node)) return node.flatMap(child => find(child, predicate));
    if (!node || typeof node !== 'object') return [];
    return [...(predicate(node) ? [node] : []), ...find(node.props?.children, predicate)];
  }
  return {
    navigations,
    submit: () => find(render(), node => node.type === 'form')[0].props.onSubmit({ preventDefault() {} }),
    errors: () => find(render(), node => node.props?.role === 'alert'),
  };
}

for (const isAdmin of [false, true]) {
  const role = isAdmin ? 'admin' : 'donor';
  test(`${role}: successful login loads a fresh document only after the login response`, async () => {
    let finish;
    const h = harness(isAdmin, async (url, options) => {
      assert.equal(url, `/api/auth/${role}/login`);
      assert.equal(options.method, 'POST');
      return new Promise(resolve => { finish = resolve; });
    });
    const pending = h.submit();
    assert.deepEqual(h.navigations, []);
    finish({ ok: true, json: async () => ({ ok: true }) });
    await pending;
    assert.deepEqual(h.navigations, [isAdmin ? '/admin/dashboard' : '/find-egg-donor']);
  });
  test(`${role}: rejected credentials leave the login form visible with an error`, async () => {
    const h = harness(isAdmin, async () => ({ ok: false, json: async () => ({ message: 'Invalid credentials' }) }));
    await h.submit();
    assert.deepEqual(h.navigations, []);
    assert.equal(h.errors().length, 1);
  });
}

test('network failure does not navigate away from login', async () => {
  const h = harness(false, async () => { throw new Error('Network unavailable'); });
  await h.submit();
  assert.deepEqual(h.navigations, []);
  assert.equal(h.errors().length, 1);
});
