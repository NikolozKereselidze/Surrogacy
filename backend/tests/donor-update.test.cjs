const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadService(deleteFile) {
  const source = fs.readFileSync(path.join(__dirname, '../src/services/donorProfileService.ts'), 'utf8');
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', 'console', code)(
    (name) => {
      if (name === '../lib/logger.js') return { logEvent() {} };
      assert.equal(name, './s3Service.js');
      return { deleteFileFromS3: deleteFile };
    }, module, module.exports, { error() {} },
  );
  return module.exports.updateDonorWithProfile;
}

function fixture(model, { galleryFails = false, missing = false, commitFails = false, cleanupFails = false } = {}) {
  const original = {
    id: 'donor', databaseUserId: 'profile', databaseUser: {
      id: 'profile', age: 28, mainImagePath: 'old-main', documentPath: 'old-doc',
      donorImages: [{ imagePath: 'kept-gallery', isMain: false }, { imagePath: 'old-gallery', isMain: false }],
    },
  };
  let committed = structuredClone(original);
  let didCommit = false;
  const deleted = [];
  const prisma = {
    async $transaction(callback) {
      const staged = structuredClone(committed);
      const tx = {
        [model]: { findUnique: async () => missing ? null : structuredClone(staged) },
        databaseUser: { update: async ({ data }) => Object.assign(staged.databaseUser, data) },
        donorImage: {
          deleteMany: async () => { staged.databaseUser.donorImages = staged.databaseUser.donorImages.filter(image => image.isMain); },
          createMany: async ({ data }) => {
            if (galleryFails) throw new Error('Gallery insert failed');
            staged.databaseUser.donorImages.push(...data);
          },
        },
      };
      const result = await callback(tx);
      if (commitFails) throw new Error('Commit failed');
      committed = staged;
      didCommit = true;
      return result;
    },
  };
  const update = loadService(async key => {
    assert.equal(didCommit, true, 'No file can be deleted before commit');
    const referenced = [committed.databaseUser.mainImagePath, committed.databaseUser.documentPath,
      ...committed.databaseUser.donorImages.map(image => image.imagePath)];
    assert.equal(referenced.includes(key), false, 'Never delete a still-referenced file');
    if (cleanupFails) throw new Error('S3 unavailable');
    deleted.push(key);
  });
  return { original, prisma, update, deleted, saved: () => committed };
}

for (const model of ['eggDonor', 'spermDonor', 'surrogate']) {
  const changes = { age: 30, mainImagePath: 'new-main', documentPath: 'new-doc', secondaryImages: ['kept-gallery', 'new-gallery'] };
  test(`${model}: gallery failure rolls back profile and gallery and preserves files`, async () => {
    const f = fixture(model, { galleryFails: true });
    await assert.rejects(f.update(f.prisma, model, 'donor', changes), /Gallery insert failed/);
    assert.deepEqual(f.saved(), f.original);
    assert.deepEqual(f.deleted, []);
  });
  test(`${model}: commit failure never cleans up files`, async () => {
    const f = fixture(model, { commitFails: true });
    await assert.rejects(f.update(f.prisma, model, 'donor', changes), /Commit failed/);
    assert.deepEqual(f.saved(), f.original);
    assert.deepEqual(f.deleted, []);
  });
  test(`${model}: successful save cleans up only superseded assets after commit`, async () => {
    const f = fixture(model);
    const result = await f.update(f.prisma, model, 'donor', changes);
    assert.equal(result.databaseUser.age, 30);
    assert.equal(result.databaseUser.mainImagePath, 'new-main');
    assert.equal(result.databaseUser.documentPath, 'new-doc');
    assert.deepEqual(result.databaseUser.donorImages.map(image => image.imagePath), changes.secondaryImages);
    assert.deepEqual(f.deleted.sort(), ['old-doc', 'old-gallery', 'old-main']);
  });
  test(`${model}: omitted gallery is kept and an empty gallery clears it`, async () => {
    const f = fixture(model);
    const result = await f.update(f.prisma, model, 'donor', { age: 31 });
    assert.deepEqual(result.databaseUser.donorImages, f.original.databaseUser.donorImages);
    assert.deepEqual(f.deleted, []);
    const cleared = await f.update(f.prisma, model, 'donor', { secondaryImages: [] });
    assert.deepEqual(cleared.databaseUser.donorImages, []);
    assert.deepEqual(f.deleted.sort(), ['kept-gallery', 'old-gallery']);
  });
  test(`${model}: storage cleanup failure does not report a committed save as failed`, async () => {
    const f = fixture(model, { cleanupFails: true });
    const result = await f.update(f.prisma, model, 'donor', changes);
    assert.equal(result.databaseUser.mainImagePath, 'new-main');
    assert.deepEqual(f.saved(), result);
  });
  test(`${model}: missing profile returns null without touching storage`, async () => {
    const f = fixture(model, { missing: true });
    assert.equal(await f.update(f.prisma, model, 'missing', changes), null);
    assert.deepEqual(f.saved(), f.original);
    assert.deepEqual(f.deleted, []);
  });
}

function formSubmit({ saveFails = false, uploadFails = false } = {}) {
  const filename = path.join(__dirname, '../../next-frontend/src/components/Admin/DonorForm.tsx');
  const file = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let handler;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(file) === 'handleSubmit') handler = node.initializer;
    ts.forEachChild(node, visit);
  }
  visit(file);
  const code = ts.transpileModule('const handleSubmit = ' + handler.getText(file), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  const deleted = [];
  const errors = [];
  const scope = {
    submitting: false, setSubmitting() {}, setError(value) { errors.push(value); },
    editingDonor: { id: 'donor', databaseUser: { mainImagePath: 'old-main', documentPath: 'old-doc' } },
    storageProfileId: 'donor', donorType: 'egg-donors', mainImageFile: { name: 'new.webp' },
    documentFile: {}, secondaryImageFiles: [],
    formData: { height: '165', weight: '60', age: '28', secondaryImages: [] },
    uploadFileToS3: async (_file, type) => { if (uploadFails && type === 'document') throw new Error('Upload failed'); return 'new-' + type; },
    deleteFileFromS3: async key => { deleted.push(key); }, resetFileStates() {},
    onSubmit: async () => { if (saveFails) throw new Error('Response lost'); },
    console: { error() {} },
  };
  const submit = new Function(...Object.keys(scope), code + ';return handleSubmit;')(...Object.values(scope));
  return { submit: () => submit({ preventDefault() {} }), deleted, errors };
}

test('form: lost save response preserves uploads that the server may have committed', async () => {
  const f = formSubmit({ saveFails: true });
  await f.submit();
  assert.deepEqual(f.deleted, []);
  assert.equal(f.errors.at(-1), 'Response lost');
});
test('form: successful save delegates old-file cleanup to the server', async () => {
  const f = formSubmit();
  await f.submit();
  assert.deepEqual(f.deleted, []);
});
test('form: upload failure before saving cleans up only newly uploaded files', async () => {
  const f = formSubmit({ uploadFails: true });
  await f.submit();
  assert.deepEqual(f.deleted, ['new-image']);
  assert.equal(f.errors.at(-1), 'Failed to upload document. Please try again.');
});
