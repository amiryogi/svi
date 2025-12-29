const Hero = require('../models/Hero');
const { deleteFromCloudinary } = require('../utils/cloudinaryHelper');

/**
 * @desc    Get hero data
 * @route   GET /api/hero
 * @access  Public
 */
const getHero = async (req, res, next) => {
    try {
        // Get the active hero or the first one
        const hero = await Hero.findOne({ active: true }) || await Hero.findOne();

        if (!hero) {
            return res.json({
                success: true,
                data: null,
            });
        }

        res.json({
            success: true,
            data: hero,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update hero data
 * @route   PUT /api/hero
 * @access  Admin
 */
const updateHero = async (req, res, next) => {
    try {
        // DEBUG: Log incoming request
        console.log('=== HERO UPDATE DEBUG ===');
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);
        console.log('=========================');

        const {
            overlayTitle,
            overlaySubtitle,
            ctaText,
            ctaLink,
            secondaryCta,
            secondaryCtaLink,
            active
        } = req.body;

        // Find existing hero or create new
        let hero = await Hero.findOne();

        const updateData = {
            overlayTitle,
            overlaySubtitle,
            ctaText,
            ctaLink,
            secondaryCta,
            secondaryCtaLink,
            active: active !== 'false',
        };

        // Handle video upload
        if (req.file) {
            console.log('Video file received:', req.file.path, req.file.filename);
            // Delete old video
            if (hero?.video?.cloudinaryId) {
                await deleteFromCloudinary(hero.video.cloudinaryId, 'video');
            }

            updateData.video = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        } else {
            console.log('No video file in request');
        }

        if (hero) {
            hero = await Hero.findByIdAndUpdate(hero._id, updateData, {
                new: true,
                runValidators: true,
            });
        } else {
            // Verify we have video data for new hero
            if (!updateData.video && !req.file) {
                return res.status(400).json({ message: 'Video is required for hero section' });
            }
            hero = await Hero.create(updateData);
        }

        res.json({
            success: true,
            data: hero,
        });
    } catch (error) {
        console.error('Hero update error:', error);
        next(error);
    }
};

/**
 * @desc    Delete hero
 * @route   DELETE /api/hero/:id
 * @access  Admin
 */
const deleteHero = async (req, res, next) => {
    try {
        const hero = await Hero.findById(req.params.id);

        if (!hero) {
            return res.status(404).json({ message: 'Hero not found' });
        }

        // Delete video from Cloudinary
        if (hero.video?.cloudinaryId) {
            await deleteFromCloudinary(hero.video.cloudinaryId, 'video');
        }

        await hero.deleteOne();

        res.json({
            success: true,
            message: 'Hero deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHero,
    updateHero,
    deleteHero,
};
