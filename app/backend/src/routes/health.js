const router = require('express').Router();
const { pool } = require('../db');

// Liveness: is the process alive? (no DB check)
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Readiness: can the app serve traffic? (checks DB)
router.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ready' });
  } catch (err) {
    res.status(503).json({ status: 'db unavailable' });
  }
});

module.exports = router;
