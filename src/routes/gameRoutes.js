const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Create
router.post('/game', gameController.createGame);

// Read
router.get('/game', gameController.getAllGames);
router.get('/game/:id', gameController.getGameById);

// Update
router.put('/game/:id', gameController.updateGame);

// Delete
router.delete('/game/:id', gameController.deleteGame);

module.exports = router;