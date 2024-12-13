const express = require('express');
const { getMyCharacter, getAllCharacters } = require('../controllers/characterController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authenticate, getMyCharacter);
router.get('/all', authenticate, getAllCharacters);

module.exports = router;
