const express = require('express');
const router = express.Router();
const {
    getPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
} = require('../controllers/programController');
const { protect, optionalAuth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const { uploadImage } = require('../middleware/upload');

// Public routes
router.get('/', optionalAuth, getPrograms);
router.get('/:id', getProgram);

// Admin only routes
router.post('/', protect, isAdmin, uploadImage.single('image'), createProgram);
router.put('/:id', protect, isAdmin, uploadImage.single('image'), updateProgram);
router.delete('/:id', protect, isAdmin, deleteProgram);

module.exports = router;
