const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        required: [true, 'Type is required'],
    },
    category: {
        type: String,
        enum: ['Events', 'Academics', 'Sports', 'Celebrations', 'Competitions', 'Field Trips', 'Other'],
        default: 'Other',
    },
    media: {
        url: {
            type: String,
            required: [true, 'Media URL is required'],
        },
        cloudinaryId: {
            type: String,
            required: [true, 'Cloudinary ID is required'],
        },
        thumbnail: String,
        width: Number,
        height: Number,
        format: String,
        duration: Number, // for videos
    },
    youtubeUrl: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    order: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Indexes
gallerySchema.index({ category: 1, order: 1 });
gallerySchema.index({ type: 1 });
gallerySchema.index({ active: 1, createdAt: -1 });

module.exports = mongoose.model('Gallery', gallerySchema);
