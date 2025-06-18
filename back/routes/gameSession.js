const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const { createGameSession } = require('../controllers/gameSessionController');

router.post('/', protect, createGameSession);

module.exports = router;
