const express = require('express');
const { updateUserRole } = require('../controllers/roleController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/update', authenticate, updateUserRole);

module.exports = router;
