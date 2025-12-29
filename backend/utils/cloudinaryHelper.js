const cloudinary = require('../config/cloudinary');

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - 'image' or 'video'
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        if (!publicId) return;
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw error;
    }
};

/**
 * Upload file to Cloudinary
 * @param {string} filePath - Local file path or URL
 * @param {object} options - Upload options
 */
const uploadToCloudinary = async (filePath, options = {}) => {
    try {
        const defaultOptions = {
            folder: 'svi-school',
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
        };

        const result = await cloudinary.uploader.upload(filePath, {
            ...defaultOptions,
            ...options,
        });

        return {
            url: result.secure_url,
            cloudinaryId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            resourceType: result.resource_type,
            duration: result.duration,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

/**
 * Get optimized image URL
 * @param {string} publicId - Cloudinary public ID
 * @param {object} options - Transformation options
 */
const getOptimizedUrl = (publicId, options = {}) => {
    const defaultOptions = {
        quality: 'auto',
        fetch_format: 'auto',
        ...options,
    };

    return cloudinary.url(publicId, defaultOptions);
};

/**
 * Get video thumbnail URL
 * @param {string} publicId - Cloudinary public ID
 */
const getVideoThumbnail = (publicId) => {
    return cloudinary.url(publicId, {
        resource_type: 'video',
        format: 'jpg',
        transformation: [
            { width: 400, height: 300, crop: 'fill' },
            { quality: 'auto' },
        ],
    });
};

module.exports = {
    deleteFromCloudinary,
    uploadToCloudinary,
    getOptimizedUrl,
    getVideoThumbnail,
};
