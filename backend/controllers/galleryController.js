const Gallery = require('../models/Gallery');
const { deleteFromCloudinary, getVideoThumbnail } = require('../utils/cloudinaryHelper');

/**
 * @desc    Get all gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
const getGalleryItems = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, category, type, active } = req.query;

        const query = {};

        // Only show active for public
        if (!req.user) {
            query.active = true;
        } else if (active !== undefined) {
            query.active = active === 'true';
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        if (type) {
            query.type = type;
        }

        const items = await Gallery.find(query)
            .sort('-createdAt order')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Gallery.countDocuments(query);

        res.json({
            success: true,
            count: items.length,
            total,
            pages: Math.ceil(total / limit),
            data: items,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single gallery item
 * @route   GET /api/gallery/:id
 * @access  Public
 */
const getGalleryItem = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        res.json({
            success: true,
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create gallery item
 * @route   POST /api/gallery
 * @access  Admin/Editor
 */
const createGalleryItem = async (req, res, next) => {
    try {
        const { title, type, category, description, youtubeUrl, order, active } = req.body;

        if (!req.file && !youtubeUrl) {
            return res.status(400).json({ message: 'Please upload a file or provide a YouTube URL' });
        }

        const galleryData = {
            title,
            type: type || 'image',
            category: category || 'Other',
            description,
            youtubeUrl,
            order: order || 0,
            active: active !== 'false',
        };

        // Handle file upload
        if (req.file) {
            galleryData.media = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
                format: req.file.mimetype,
            };

            // Generate thumbnail for videos
            if (type === 'video' || req.file.mimetype.startsWith('video/')) {
                galleryData.type = 'video';
                galleryData.media.thumbnail = getVideoThumbnail(req.file.filename);
            }
        }

        const item = await Gallery.create(galleryData);

        res.status(201).json({
            success: true,
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update gallery item
 * @route   PUT /api/gallery/:id
 * @access  Admin/Editor
 */
const updateGalleryItem = async (req, res, next) => {
    try {
        let item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        const { title, category, description, youtubeUrl, order, active } = req.body;

        const updateData = {
            title,
            category,
            description,
            youtubeUrl,
            order,
            active: active !== 'false',
        };

        // Handle new file upload
        if (req.file) {
            // Delete old media
            if (item.media?.cloudinaryId) {
                const resourceType = item.type === 'video' ? 'video' : 'image';
                await deleteFromCloudinary(item.media.cloudinaryId, resourceType);
            }

            updateData.media = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
                format: req.file.mimetype,
            };

            if (req.file.mimetype.startsWith('video/')) {
                updateData.type = 'video';
                updateData.media.thumbnail = getVideoThumbnail(req.file.filename);
            }
        }

        item = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete gallery item
 * @route   DELETE /api/gallery/:id
 * @access  Admin
 */
const deleteGalleryItem = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        // Delete media from Cloudinary
        if (item.media?.cloudinaryId) {
            const resourceType = item.type === 'video' ? 'video' : 'image';
            await deleteFromCloudinary(item.media.cloudinaryId, resourceType);
        }

        await item.deleteOne();

        res.json({
            success: true,
            message: 'Gallery item deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getGalleryItems,
    getGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
};
