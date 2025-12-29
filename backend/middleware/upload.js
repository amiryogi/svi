const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

/**
 * Cloudinary storage for images
 */
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'svi-school/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [
            { width: 1200, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
        ],
    },
});

/**
 * Cloudinary storage for videos
 */
const videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'svi-school/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
        transformation: [
            { quality: 'auto' },
            { fetch_format: 'auto' },
        ],
    },
});

/**
 * Generic storage for any files
 */
const genericStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'svi-school/files';
        let resourceType = 'auto';

        if (file.mimetype.startsWith('image/')) {
            folder = 'svi-school/images';
            resourceType = 'image';
        } else if (file.mimetype.startsWith('video/')) {
            folder = 'svi-school/videos';
            resourceType = 'video';
        }

        return {
            folder,
            resource_type: resourceType,
            transformation: file.mimetype.startsWith('image/')
                ? [{ quality: 'auto' }, { fetch_format: 'auto' }]
                : undefined,
        };
    },
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// File filter for videos
const videoFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed'), false);
    }
};

// File filter for images and videos
const mediaFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image and video files are allowed'), false);
    }
};

// Multer instances
const uploadImage = multer({
    storage: imageStorage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadVideo = multer({
    storage: videoStorage,
    fileFilter: videoFileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

const uploadMedia = multer({
    storage: genericStorage,
    fileFilter: mediaFileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

module.exports = {
    uploadImage,
    uploadVideo,
    uploadMedia,
};
