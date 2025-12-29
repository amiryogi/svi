const express = require('express');
const router = express.Router();
const {
    getGalleryItems,
    getGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController');
const { protect, optionalAuth } = require('../middleware/auth');
const { isEditor, isAdmin } = require('../middleware/roleCheck');
const { uploadMedia } = require('../middleware/upload');

// Public routes
router.get('/', optionalAuth, getGalleryItems);
router.get('/:id', getGalleryItem);

// Protected routes (Admin/Editor)
router.post('/', protect, isEditor, uploadMedia.single('media'), createGalleryItem);
router.put('/:id', protect, isEditor, uploadMedia.single('media'), updateGalleryItem);

// Admin only
router.delete('/:id', protect, isAdmin, deleteGalleryItem);

module.exports = router;
