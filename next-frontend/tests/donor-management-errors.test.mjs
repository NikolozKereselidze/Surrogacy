import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const sourceRequire = createRequire(import.meta.url);
const directory = path.dirname(fileURLToPath(import.meta.url));
function load(filename, mocks, fetchMock) {
  const code = ts.transpileModule(fs.readFileSync(path.join(directory, '../src', filename), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'process', 'fetch', code)(
    name => Object.hasOwn(mocks, name) ? mocks[name] : sourceRequire(name),
    compiled, compiled.exports, { env: { NEXT_PUBLIC_CLOUDFRONT_DOMAIN: 'https://images.example.com' } }, fetchMock,
  );
  return compiled.exports;
}
const donor = {
  id: 'donor-id', databaseUser: { age: 28, height: 165, weight: 60, available: true,
    mainImagePath: 'main.webp', documentPath: 'profile.pdf', donorImages: [
      { imagePath: 'gallery.webp', isMain: false },
    ],
  },
};
const response = (status, data) => ({ status, ok: status >= 200 && status < 300, json: async () => data });
function harness(endpoint = '/api/egg-donors') {
  const state = [];
  let index = 0;
  const redirects = [];
  const router = { replace(url) { redirects.push(url); } };
  const queue = [];
  const requests = [];
  const react = {
    useState(initial) {
      const key = index++;
      if (!(key in state)) state[key] = initial;
      return [state[key], value => { state[key] = typeof value === 'function' ? value(state[key]) : value; }];
    },
    useEffect() {}, useCallback(callback) { return callback; }, useMemo(callback) { return callback(); },
  };
  const fetchMock = async (url, options = {}) => {
    requests.push({ url, ...options });
    assert.ok(queue.length, 'Unexpected network request');
    const next = queue.shift();
    if (next instanceof Error) throw next;
    return next;
  };
  const hook = load('hooks/useDonorManagement.ts', { react, 'next/navigation': { useRouter: () => router } }, fetchMock).useDonorManagement;
  const table = load('components/Admin/DonorTable.tsx', {
    react, 'next/image': () => null, 'react-icons/fa': { FaEdit: () => null, FaTrash: () => null },
    '@/styles/Admin/AdminDashboard.module.css': {},
  }).default;
  const render = () => { index = 0; return hook(endpoint); };
  return { queue, redirects, requests, render, async refresh() { await render().fetchDonors(); return render(); },
    checkTable(result) { index = 100; assert.doesNotThrow(() => table({ donors: result.donors, donorUrls: result.donorUrls })); },
  };
}

for (const endpoint of ['/api/egg-donors', '/api/sperm-donors', '/api/surrogate-donors']) {
  test(`${endpoint}: a 500 response remains an error, never donor-list state`, async () => {
    const h = harness(endpoint);
    h.queue.push(response(500, { error: 'Database unavailable' }));
    const result = await h.refresh();
    assert.deepEqual(result.donors, []);
    assert.equal(result.error, 'Database unavailable');
    assert.equal(result.hasLoaded, false);
    assert.equal(result.loading, false);
    h.checkTable(result);
  });
}
test('expired sessions clear private list data and return to admin login', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]), response(401, { message: 'Admin authorization required' }));
  await h.refresh();
  const result = await h.refresh();
  assert.deepEqual(result.donors, []);
  assert.deepEqual(result.donorUrls, {});
  assert.equal(result.hasLoaded, false);
  assert.match(result.error, /session has expired/);
  assert.deepEqual(h.redirects, ['/login/admin']);
  h.checkTable(result);
});
test('invalid response shapes cannot overwrite the last valid list or its URLs', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]));
  const original = await h.refresh();
  for (const invalid of [{ error: 'Unexpected error' }, null, [null], [{ id: 'bad' }],
    [{ ...donor, databaseUser: { ...donor.databaseUser, donorImages: {} } }],
    [{ ...donor, databaseUser: { ...donor.databaseUser, age: '28' } }],
    [{ ...donor, databaseUser: { ...donor.databaseUser, donorImages: [null] } }]]) {
    h.queue.push(response(200, invalid));
    const result = await h.refresh();
    assert.deepEqual(result.donors, original.donors);
    assert.deepEqual(result.donorUrls, original.donorUrls);
    assert.match(result.error, /invalid donor profiles/);
    h.checkTable(result);
  }
});
test('network and non-JSON failures are recoverable through a successful retry', async () => {
  const h = harness();
  for (const failure of [new Error('Network unavailable'), { status: 502, ok: false, json: async () => { throw new SyntaxError('HTML response'); } }]) {
    h.queue.push(failure);
    const result = await h.refresh();
    assert.ok(result.error);
    assert.deepEqual(result.donors, []);
    assert.equal(result.loading, false);
    h.checkTable(result);
  }
  h.queue.push(response(200, [donor]));
  const recovered = await h.refresh();
  assert.equal(recovered.error, '');
  assert.equal(recovered.hasLoaded, true);
  assert.deepEqual(recovered.donors, [donor]);
  assert.equal(recovered.donorUrls[donor.id].mainImageUrl, 'https://images.example.com/main.webp');
});
test('failed deletion displays an error and preserves the donor without refreshing', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]));
  await h.refresh();
  h.queue.push(response(500, { error: 'Could not delete profile' }));
  await h.render().deleteDonor(donor.id);
  const result = h.render();
  assert.deepEqual(result.donors, [donor]);
  assert.equal(result.error, 'Could not delete profile');
  assert.equal(h.requests.length, 2);
});
test('expired sessions during deletion also return to login', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]));
  await h.refresh();
  h.queue.push(response(401, { message: 'Unauthorized' }));
  await h.render().deleteDonor(donor.id);
  assert.deepEqual(h.render().donors, []);
  assert.deepEqual(h.redirects, ['/login/admin']);
});
test('a committed deletion stays removed even if refreshing the list fails', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]));
  await h.refresh();
  h.queue.push(response(200, { message: 'Deleted' }), response(500, { error: 'Refresh failed' }));
  await h.render().deleteDonor(donor.id);
  const result = h.render();
  assert.deepEqual(result.donors, []);
  assert.equal(result.hasLoaded, true);
  assert.equal(result.error, 'Refresh failed');
  h.checkTable(result);
});
test('successful empty list is distinguished from a failed initial load', async () => {
  const h = harness();
  h.queue.push(response(200, []));
  const result = await h.refresh();
  assert.deepEqual(result.donors, []);
  assert.equal(result.hasLoaded, true);
    assert.equal(result.error, '');
});

function management(result, fetchMock) {
  const state = [true, donor];
  let index = 0;
  const DonorForm = () => null;
  const DonorTable = () => null;
  const component = load('components/Admin/DonorManagement.tsx', {
    react: { useState(initial) {
      const key = index++;
      if (!(key in state)) state[key] = initial;
      return [state[key], value => { state[key] = value; }];
    } },
    'react-icons/fa': { FaPlus: () => null, FaUser: () => null, FaUserPlus: () => null },
    'react-icons/md': { MdFamilyRestroom: () => null },
    '@/hooks/useDonorManagement': { useDonorManagement: () => result },
    '@/config/donorConfigs': { donorConfigs: { 'egg-donors': { title: 'Egg Donors', apiEndpoint: '/api/egg-donors' } } },
    './DonorForm': DonorForm, './DonorTable': DonorTable,
    '@/styles/Admin/AdminDashboard.module.css': {},
  }, fetchMock).default;
  const render = () => { index = 0; return component({ donorType: 'egg-donors' }); };
  const find = (predicate) => {
    const found = [];
    function visit(node) {
      if (Array.isArray(node)) { node.forEach(visit); return; }
      if (!node || typeof node !== 'object') return;
      if (predicate(node)) found.push(node);
      visit(node.props?.children);
    }
    visit(render());
    return found;
  };
  return { find, form: () => find(node => node.type === DonorForm)[0], table: () => find(node => node.type === DonorTable)[0] };
}

test('failed initial load displays a retry action without a misleading empty table', async () => {
  const h = harness();
  h.queue.push(response(500, { error: 'Load failed' }));
  const result = await h.refresh();
  let retries = 0;
  const view = management({ ...result, fetchDonors: () => { retries++; } });
  assert.ok(view.find(node => node.props?.role === 'alert').length);
  assert.equal(view.table(), undefined);
  view.find(node => node.type === 'button' && node.props.children === 'Retry loading profiles')[0].props.onClick();
  assert.equal(retries, 1);
});
test('expired sessions during a profile save redirect to login', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]));
  const result = await h.refresh();
  const view = management(result, async () => response(401, { message: 'Unauthorized' }));
  await assert.rejects(view.form().props.onSubmit({ age: 29 }), /session has expired/);
  assert.deepEqual(h.redirects, ['/login/admin']);
  assert.deepEqual(h.render().donors, []);
});
test('committed profile save still succeeds when subsequent list refresh fails', async () => {
  const h = harness();
  h.queue.push(response(200, [donor]));
  const result = await h.refresh();
  h.queue.push(response(500, { error: 'Refresh failed' }));
  const view = management(result, async () => response(200, donor));
  await assert.doesNotReject(view.form().props.onSubmit({ age: 29 }));
  assert.equal(view.form(), undefined);
  assert.equal(h.render().error, 'Refresh failed');
});
