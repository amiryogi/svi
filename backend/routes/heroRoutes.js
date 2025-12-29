const express = require('express');
const router = express.Router();
const { getHero, updateHero, deleteHero } = require('../controllers/heroController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const { uploadVideo } = require('../middleware/upload');

// Public route
router.get('/', getHero);

// Admin only routes
router.put('/', protect, isAdmin, uploadVideo.single('video'), updateHero);
router.delete('/:id', protect, isAdmin, deleteHero);

module.exports = router;
