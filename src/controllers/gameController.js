const pool = require('../config/db');

const createGame = async (req, res) => {
  const { name, description, genre, platform } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO games (name, description, genre, platform) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, genre, platform]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllGames = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM games');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Game not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const { name, description, genre, platform } = req.body;
  try {
    const result = await pool.query(
      'UPDATE games SET name = $1, description = $2, genre = $3, platform = $4 WHERE id = $5 RETURNING *',
      [name, description, genre, platform, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Game not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Game not found' });
    } else {
      res.status(200).json({ message: 'Game deleted' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};