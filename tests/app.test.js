import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

async function withServer(run) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const address = server.address();
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('health endpoint returns service status and version', async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { service: 'Fly Sunnah API', status: 'ok', version: '1.0.0' });
    assert.equal(response.headers.get('x-powered-by'), null);
  });
});

test('API discovery endpoint lists supported routes', async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/api`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { name: 'Fly Sunnah Backend API', endpoints: ['/health', '/api'] });
  });
});

test('unknown routes return JSON 404', async () => {
  await withServer(async (base) => {
    const response = await fetch(`${base}/missing`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { error: 'Not found' });
  });
});
