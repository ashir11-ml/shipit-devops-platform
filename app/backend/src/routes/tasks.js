const router = require('express').Router();
const { pool } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, created_at FROM tasks ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (title.length < 1 || title.length > 200) {
      return res.status(400).json({ error: 'title must be 1-200 characters' });
    }
    const { rows } = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, created_at',
      [title]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'invalid id' });
    }
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'task not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
