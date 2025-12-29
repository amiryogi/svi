const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const { uploadImage } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

/**
 * @desc    Upload image for page content (editor)
 * @route   POST /api/upload/image
 * @access  Admin
 */
router.post('/image', protect, isAdmin, uploadImage.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        // The upload middleware already handles Cloudinary upload
        // req.file should have the cloudinary info
        res.json({
            success: true,
            data: {
                url: req.file.path, // Cloudinary URL
                publicId: req.file.filename
            }
        });
    } catch (error) {
        console.error('Image upload error:', error);
        next(error);
    }
});

module.exports = router;
