import app from './app.js';

const port = Number(process.env.PORT || 8780);

app.listen(port, () => console.log(`Fly Sunnah API listening on ${port}`));
