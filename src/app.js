import express from 'express';

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ service: 'Fly Sunnah API', status: 'ok', version: '1.0.0' });
});

app.get('/api', (_req, res) => {
  res.json({ name: 'Fly Sunnah Backend API', endpoints: ['/health', '/api'] });
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body too large' });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

export default app;
