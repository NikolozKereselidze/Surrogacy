import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

for (const role of ['admin', 'donor']) {
  test(`${role}: login forwards a valid diagnostic ID without exposing the token`, async () => {
    const code = ts.transpileModule(fs.readFileSync(new URL(`../src/app/api/auth/${role}/login/route.ts`, import.meta.url), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const id = 'b0fd6a3e-dc88-4b41-a8c2-3b53fd758160';
    for (const status of [200, 401]) {
      for (const requestId of [id, 'untrusted-value']) {
        const compiled = { exports: {} };
        const cookies = [];
        new Function('require', 'module', 'exports', 'process', 'fetch', code)(
          () => ({ NextResponse: { json: (body, options = {}) => ({ body, headers: new Headers(options.headers), cookies: { set: (...args) => cookies.push(args) } }) } }),
          compiled, compiled.exports, { env: { NEXT_PUBLIC_API_BASE_URL: 'https://api.example.com' } },
          async () => new Response(JSON.stringify(status === 200 ? { token: 'private-token' } : { message: 'Invalid credentials' }), { status, headers: { 'x-request-id': requestId } }),
        );
        const response = await compiled.exports.POST({ json: async () => ({ username: 'user', password: 'private-password' }) });
        assert.equal(response.headers.get('x-request-id'), requestId === id ? id : null);
        assert.doesNotMatch(JSON.stringify(response.body), /private-token|private-password/);
        assert.equal(cookies.length, status === 200 ? 1 : 0);
      }
    }
  });
}
