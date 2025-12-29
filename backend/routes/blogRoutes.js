const express = require('express');
const router = express.Router();
const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const { protect, optionalAuth } = require('../middleware/auth');
const { isEditor, isAdmin } = require('../middleware/roleCheck');
const { uploadImage } = require('../middleware/upload');

// Public routes
router.get('/', optionalAuth, getBlogs);
router.get('/:slug', optionalAuth, getBlog);

// Protected routes (Admin/Editor)
router.post('/', protect, isEditor, uploadImage.single('image'), createBlog);
router.put('/:id', protect, isEditor, uploadImage.single('image'), updateBlog);

// Admin only
router.delete('/:id', protect, isAdmin, deleteBlog);

module.exports = router;
