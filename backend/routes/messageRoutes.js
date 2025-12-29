const express = require('express');
const router = express.Router();
const {
    submitMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
    markAllAsRead
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Public route
router.post('/', submitMessage);

// Admin only routes
router.get('/', protect, isAdmin, getMessages);
router.patch('/mark-all-read', protect, isAdmin, markAllAsRead);
router.get('/:id', protect, isAdmin, getMessage);
router.patch('/:id', protect, isAdmin, updateMessage);
router.delete('/:id', protect, isAdmin, deleteMessage);

module.exports = router;
