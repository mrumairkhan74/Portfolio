const express = require('express');
const router = express.Router();
const { sendContactMessage, getMessages, deleteMessage } = require('../controllers/contact-controller');
const { verifyAccessToken, isAdmin } = require('../middleware/verifyAccessToken');

// Public route
router.post('/', sendContactMessage);

// Admin routes (protected)
router.get('/', verifyAccessToken, isAdmin, getMessages);
router.delete('/:id', verifyAccessToken, isAdmin, deleteMessage);

module.exports = router;