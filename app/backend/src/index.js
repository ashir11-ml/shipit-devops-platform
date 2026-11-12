const express = require('express');
const { pool, initDb } = require('./db');

const app = express();
app.use(express.json());

app.use('/api', require('./routes/health'));
app.use('/api/tasks', require('./routes/tasks'));

app.use((req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
});

// Initialise the DB in the background so /api/health works immediately.
initDb().catch((err) => {
  console.error('Could not initialise database:', err.message);
  process.exit(1);
});

// Graceful shutdown (Kubernetes sends SIGTERM when stopping a pod).
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  server.close(() => pool.end().then(() => process.exit(0)));
});
