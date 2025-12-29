const express = require('express');
const router = express.Router();
const {
    getNotices,
    getNotice,
    createNotice,
    updateNotice,
    deleteNotice
} = require('../controllers/noticeController');
const { protect, optionalAuth } = require('../middleware/auth');
const { isEditor, isAdmin } = require('../middleware/roleCheck');
const { uploadImage } = require('../middleware/upload');

// Public routes
router.get('/', optionalAuth, getNotices);
router.get('/:id', getNotice);

// Protected routes (Admin/Editor)
router.post('/', protect, isEditor, uploadImage.single('attachment'), createNotice);
router.put('/:id', protect, isEditor, uploadImage.single('attachment'), updateNotice);

// Admin only
router.delete('/:id', protect, isAdmin, deleteNotice);

module.exports = router;
