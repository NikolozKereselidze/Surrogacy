const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function fixture({ databaseFails = false, cleanupFails = false, missing = false } = {}) {
  let saved = missing ? null : { id: 'post', title: 'Original', imagePath: 'blogs/images/original.webp' };
  const events = [];
  const deleted = [];
  const errors = [];
  const prisma = { blogPost: {
    findUnique: async () => saved ? structuredClone(saved) : null,
    update: async ({ data }) => {
      events.push('database update');
      if (databaseFails) throw new Error('Database unavailable');
      saved = { ...saved, ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) };
      return structuredClone(saved);
    },
    delete: async () => {
      events.push('database delete');
      if (databaseFails) throw new Error('Database unavailable');
      const previous = saved;
      saved = null;
      return previous;
    },
  } };
  class Command { constructor(input) { this.input = input; } }
  const mocks = {
    '../lib/prisma.js': { prisma },
    '@aws-sdk/client-s3': {
      PutObjectCommand: Command, DeleteObjectCommand: Command,
      S3Client: class { async send(command) {
        events.push('storage delete');
        if (cleanupFails) throw new Error('Storage unavailable');
        deleted.push(command.input.Key);
      } },
    },
    '@aws-sdk/s3-request-presigner': { getSignedUrl: async () => 'unused' },
    uuid: { v4: () => 'unused' },
  };
  const source = fs.readFileSync(path.join(__dirname, '../src/controllers/blogController.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const compiled = { exports: {} };
  new Function('require', 'module', 'exports', 'process', 'console', code)(
    name => { assert.ok(Object.hasOwn(mocks, name), name); return mocks[name]; },
    compiled, compiled.exports, { env: { S3_ACCESS_KEY: 'fake', S3_SECRET_ACCESS_KEY: 'fake', S3_BUCKET_NAME: 'fake' } },
    { log() {}, error(...args) { errors.push(args); } },
  );
  const response = { statusCode: 200, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
  return { controller: compiled.exports.default, response, events, deleted, errors, saved: () => saved };
}

test('failed image replacement preserves the existing post and image', async () => {
  const f = fixture({ databaseFails: true });
  await f.controller.updateBlogPost({ params: { id: 'post' }, body: { imagePath: 'blogs/images/new.webp' } }, f.response);
  assert.equal(f.response.statusCode, 500);
  assert.equal(f.saved().imagePath, 'blogs/images/original.webp');
  assert.deepEqual(f.deleted, []);
  assert.deepEqual(f.events, ['database update']);
});
test('successful replacement deletes the old image only after saving the new path', async () => {
  const f = fixture();
  await f.controller.updateBlogPost({ params: { id: 'post' }, body: { imagePath: 'blogs/images/new.webp' } }, f.response);
  assert.equal(f.response.statusCode, 200);
  assert.equal(f.saved().imagePath, 'blogs/images/new.webp');
  assert.deepEqual(f.deleted, ['blogs/images/original.webp']);
  assert.deepEqual(f.events, ['database update', 'storage delete']);
});
for (const body of [{ title: 'Text-only edit' }, { imagePath: 'blogs/images/original.webp' }]) {
  test(`an ${body.imagePath ? 'unchanged' : 'omitted'} image is preserved during editing`, async () => {
    const f = fixture();
    await f.controller.updateBlogPost({ params: { id: 'post' }, body }, f.response);
    assert.equal(f.response.statusCode, 200);
    assert.equal(f.saved().imagePath, 'blogs/images/original.webp');
    assert.deepEqual(f.deleted, []);
  });
}
test('storage cleanup failure does not misreport a successful replacement', async () => {
  const f = fixture({ cleanupFails: true });
  await f.controller.updateBlogPost({ params: { id: 'post' }, body: { imagePath: 'blogs/images/new.webp' } }, f.response);
  assert.equal(f.response.statusCode, 200);
  assert.equal(f.response.body.imagePath, 'blogs/images/new.webp');
  assert.deepEqual(f.events, ['database update', 'storage delete']);
  assert.equal(f.errors.length, 1);
});
test('failed post deletion preserves its image', async () => {
  const f = fixture({ databaseFails: true });
  await f.controller.deleteBlogPost({ params: { id: 'post' } }, f.response);
  assert.equal(f.response.statusCode, 500);
  assert.ok(f.saved());
  assert.deepEqual(f.deleted, []);
  assert.deepEqual(f.events, ['database delete']);
});
test('successful post deletion removes the image afterward', async () => {
  const f = fixture();
  await f.controller.deleteBlogPost({ params: { id: 'post' } }, f.response);
  assert.equal(f.response.statusCode, 200);
  assert.equal(f.saved(), null);
  assert.deepEqual(f.events, ['database delete', 'storage delete']);
  assert.deepEqual(f.deleted, ['blogs/images/original.webp']);
});
test('storage cleanup failure still reports that the post was deleted', async () => {
  const f = fixture({ cleanupFails: true });
  await f.controller.deleteBlogPost({ params: { id: 'post' } }, f.response);
  assert.equal(f.response.statusCode, 200);
  assert.equal(f.saved(), null);
  assert.deepEqual(f.events, ['database delete', 'storage delete']);
  assert.equal(f.response.body.message, 'Blog post deleted successfully');
  assert.equal(f.errors.length, 1);
});
for (const method of ['updateBlogPost', 'deleteBlogPost']) {
  test(`${method}: missing post is a 404 without storage changes`, async () => {
    const f = fixture({ missing: true });
    await f.controller[method]({ params: { id: 'missing' }, body: { imagePath: 'new.webp' } }, f.response);
    assert.equal(f.response.statusCode, 404);
    assert.deepEqual(f.events, []);
  });
}
