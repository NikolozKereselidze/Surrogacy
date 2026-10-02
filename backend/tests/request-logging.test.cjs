const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { EventEmitter } = require('node:events');

function load(file, mocks, extra = {}) {
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', ...Object.keys(extra), code)(
    name => Object.hasOwn(mocks, name) ? mocks[name] : require(name), compiled, compiled.exports, ...Object.values(extra),
  );
  return compiled.exports;
}
function fixture(level = 'info', failingSink = false) {
  const entries = [];
  const sink = line => { if (failingSink) throw new Error('Sink unavailable'); entries.push(JSON.parse(line)); };
  const pinoFactory = options => require('pino')(options, { write: sink });
  const logger = load('lib/logger.ts', { pino: pinoFactory }, { process: { env: { LOG_LEVEL: level } } });
  const middleware = load('middleware/requestLogging.ts', { '../lib/logger.js': logger }).requestLogging;
  function request(url, method = 'POST', status = 200, profileId) {
    const res = new EventEmitter();
    res.locals = {};
    res.statusCode = status;
    res.headers = {};
    res.setHeader = (name, value) => { res.headers[name] = value; };
    let advanced = false;
    middleware({ path: url, method, body: { password: 'secret-password', children: 'private-profile' }, headers: { cookie: 'private-cookie' } }, res, () => { advanced = true; });
    assert.equal(advanced, true);
    assert.match(res.headers['X-Request-ID'], /^[a-f0-9-]{36}$/);
    if (profileId) res.locals.profileId = profileId;
    assert.doesNotThrow(() => res.emit('finish'));
    return res;
  }
  return { logger, entries, request };
}

test('login logs outcomes for both roles without credentials or cookies', () => {
  const f = fixture();
  for (const role of ['admin', 'donor']) {
    for (const status of [200, 401, 429, 503]) f.request(`/api/auth/${role}/login`, 'POST', status);
  }
  assert.equal(f.entries.length, 8);
  assert.deepEqual(f.entries.slice(0, 4).map(entry => entry.reason), ['success', 'invalid_credentials', 'rate_limited', 'service_unavailable']);
  for (const entry of f.entries) {
    assert.equal(entry.event, 'auth.login');
    assert.ok(entry.timestamp && entry.requestId);
    assert.ok(entry.durationMs >= 0);
  }
  assert.doesNotMatch(JSON.stringify(f.entries), /secret-password|private-cookie|private-profile/);
});
test('profile changes log the action, resource and created ID after response completion', () => {
  const f = fixture();
  const id = 'b0fd6a3e-dc88-4b41-a8c2-3b53fd758160';
  for (const resource of ['egg-donors', 'sperm-donors', 'surrogate-donors']) {
    f.request(`/api/${resource}`, 'POST', 200, id);
    f.request(`/api/${resource}/${id}`, 'PUT', 400);
    f.request(`/api/${resource}/${id}`, 'DELETE', 200);
  }
  assert.equal(f.entries.length, 9);
  assert.deepEqual(f.entries.slice(0, 3).map(entry => entry.action), ['create', 'update', 'delete']);
  assert.ok(f.entries.every(entry => entry.profileId === id));
  assert.equal(f.entries[1].reason, 'rejected');
});
test('routine reads, health checks and normal token checks do not create logs', () => {
  const f = fixture();
  f.request('/healthz', 'GET');
  f.request('/api/egg-donors', 'GET');
  f.request('/api/auth/donor/check-token', 'POST', 200);
  f.request('/api/auth/donor/check-token', 'POST', 401);
  assert.deepEqual(f.entries, []);
  f.request('/api/auth/donor/check-token', 'POST', 503);
  assert.equal(f.entries[0].event, 'request.failed');
});
test('unexpected errors do not log user-controlled paths or query strings', () => {
  const f = fixture();
  f.request('/unknown/private-information', 'GET', 500);
  assert.equal(f.entries[0].resource, 'api');
  assert.doesNotMatch(JSON.stringify(f.entries), /private-information/);
});
test('logger enforces an allowlist, escapes line breaks and supports volume reduction', () => {
  const f = fixture();
  f.logger.logEvent('warn', 'test', { reason: 'line\nbreak', password: 'secret', token: 'private', body: { name: 'private' } });
  assert.equal(f.entries[0].reason, 'line\nbreak');
  assert.equal(f.entries[0].password, undefined);
  assert.equal(f.entries[0].token, undefined);
  assert.equal(f.entries[0].body, undefined);
  const quiet = fixture('warn');
  quiet.request('/api/auth/admin/login');
  quiet.request('/api/auth/admin/login', 'POST', 401);
  assert.equal(quiet.entries.length, 1);
});
test('logging sink failures do not break the request', () => {
  const f = fixture('info', true);
  assert.doesNotThrow(() => f.request('/api/auth/donor/login'));
});
