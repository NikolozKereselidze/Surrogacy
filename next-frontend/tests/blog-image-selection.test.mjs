import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const sourceRequire = createRequire(import.meta.url);
const directory = path.dirname(fileURLToPath(import.meta.url));
const posts = ['first', 'second'].map(id => ({
  id, language: 'en', title: id, date: '2026-10-02', category: 'Test',
  readTime: '5', content: '<p>Test</p>', imagePath: `${id}.webp`,
}));

function harness({ saveFails = false, pendingSave = false } = {}) {
  const state = [posts, false];
  let hookIndex = 0;
  const requests = [];
  let completeSave;
  const react = {
    useState(initial) {
      const index = hookIndex++;
      if (!(index in state)) state[index] = initial;
      return [state[index], value => {
        state[index] = typeof value === 'function' ? value(state[index]) : value;
      }];
    },
    useRef(initial) {
      const index = hookIndex++;
      if (!(index in state)) state[index] = { current: initial };
      return state[index];
    },
    useEffect() {},
  };
  const ImageCompressor = () => null;
  const mocks = {
    react,
    '@/styles/Admin/AdminDashboard.module.css': {},
    'react-icons/fa': { FaPlus: () => null, FaEdit: () => null, FaTrash: () => null },
    '@/components/ImageCompressor': ImageCompressor,
    'next/image': () => null,
    './TipTapEditor': () => null,
  };
  const code = ts.transpileModule(fs.readFileSync(path.join(directory, '../src/components/Admin/BlogManagement.tsx'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'process', 'fetch', 'console', code)(
    name => Object.hasOwn(mocks, name) ? mocks[name] : sourceRequire(name),
    compiled, compiled.exports, { env: { NEXT_PUBLIC_CLOUDFRONT_DOMAIN: 'https://images.example.com' } },
    async (url, options = {}) => {
      requests.push({ url, ...options });
      if (url === '/api/blog/image') return { ok: true, json: async () => ({ uploadUrl: 'https://upload.example.com', fileUrl: 'new.webp' }) };
      if (url === 'https://upload.example.com') return { ok: true };
      if (options.method === 'PUT' || options.method === 'POST') {
        if (pendingSave) await new Promise(resolve => { completeSave = resolve; });
        return { ok: !saveFails, json: async () => ({ error: 'Save failed' }) };
      }
      return { ok: true, json: async () => posts };
    }, { error() {} },
  );
  let tree;
  function render() { hookIndex = 0; tree = compiled.exports.default(); }
  function all(predicate) {
    const found = [];
    function visit(node) {
      if (Array.isArray(node)) { node.forEach(visit); return; }
      if (!node || typeof node !== 'object') return;
      if (predicate(node)) found.push(node);
      visit(node.props?.children);
    }
    visit(tree);
    return found;
  }
  const button = label => all(node => node.type === 'button' && node.props.children === label)[0];
  const compressor = () => all(node => node.type === ImageCompressor)[0];
  render();
  return {
    requests, render, button, compressor,
    add() { all(node => node.type === 'button' && node.props.onClick && Array.isArray(node.props.children) && node.props.children.includes(' Add New Post'))[0].props.onClick(); render(); },
    async edit(index) { await all(node => node.type === 'button' && node.props.title === 'Edit')[index].props.onClick(); render(); },
    cancel() { button('Cancel').props.onClick(); render(); },
    select(file) { compressor().props.onCompressed(file); render(); },
    async save() { await all(node => node.type === 'form')[0].props.onSubmit({ preventDefault() {} }); render(); },
    finishSave() { completeSave(); },
  };
}

test('cancelled image cannot replace another post image', async () => {
  const h = harness();
  await h.edit(0);
  h.select({ name: 'cancelled.webp', type: 'image/webp' });
  h.cancel();
  await h.edit(1);
  await h.save();
  assert.equal(h.requests.some(request => request.url === '/api/blog/image'), false);
  const save = h.requests.find(request => request.method === 'PUT');
  assert.equal(save.url, '/api/blog/second');
  assert.equal(JSON.parse(save.body).imagePath, 'second.webp');
});
test('switching posts clears image selection and remounts the preview', async () => {
  const h = harness();
  await h.edit(0);
  h.select({ name: 'first-selection.webp', type: 'image/webp' });
  const key = h.compressor().key;
  await h.edit(1);
  assert.notEqual(h.compressor().key, key);
  await h.save();
  assert.equal(h.requests.some(request => request.url === '/api/blog/image'), false);
});
test('late compression from a closed form cannot attach to the next post', async () => {
  const h = harness();
  await h.edit(0);
  const oldCallback = h.compressor().props.onCompressed;
  h.cancel();
  await h.edit(1);
  oldCallback({ name: 'late.webp', type: 'image/webp' });
  h.render();
  await h.save();
  assert.equal(h.requests.some(request => request.url === '/api/blog/image'), false);
});
test('Add New Post resets previous edit fields, selection, and preview', async () => {
  const h = harness();
  await h.edit(0);
  h.select({ name: 'old.webp', type: 'image/webp' });
  const key = h.compressor().key;
  h.add();
  assert.notEqual(h.compressor().key, key);
  await h.save();
  const save = h.requests.find(request => request.method === 'POST');
  assert.equal(save.url, '/api/blog');
  assert.equal(JSON.parse(save.body).title, '');
  assert.equal(JSON.parse(save.body).imagePath, '');
  assert.equal(h.requests.some(request => request.url === '/api/blog/image'), false);
});
test('failed save keeps the current form image for retry', async () => {
  const h = harness({ saveFails: true });
  await h.edit(0);
  h.select({ name: 'retry.webp', type: 'image/webp' });
  const key = h.compressor().key;
  await h.save();
  assert.equal(h.compressor().key, key);
  await h.save();
  assert.equal(h.requests.filter(request => request.url === '/api/blog/image').length, 2);
});
test('successful save leaves a clean image selection on the next form', async () => {
  const h = harness();
  await h.edit(0);
  h.select({ name: 'saved.webp', type: 'image/webp' });
  const key = h.compressor().key;
  await h.save();
  await h.edit(1);
  assert.notEqual(h.compressor().key, key);
  await h.save();
  assert.equal(h.requests.filter(request => request.url === '/api/blog/image').length, 1);
});
test('cancel and edit transitions are disabled while a save is in progress', async () => {
  const h = harness({ pendingSave: true });
  await h.edit(0);
  const saving = h.save();
  h.render();
  assert.equal(h.button('Cancel').props.disabled, true);
  const key = h.compressor().key;
  await h.edit(1);
  assert.equal(h.compressor().key, key);
  h.add();
  assert.equal(h.compressor().key, key);
  h.finishSave();
  await saving;
});
