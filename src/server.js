import express from 'express';

const app = express();
const port = Number(process.env.PORT || 8780);

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ service: 'Fly Sunnah API', status: 'ok', version: '1.0.0' });
});

app.get('/api', (_req, res) => {
  res.json({ name: 'Fly Sunnah Backend API', endpoints: ['/health', '/api'] });
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(port, () => console.log(`Fly Sunnah API listening on ${port}`));
