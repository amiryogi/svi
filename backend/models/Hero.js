const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    video: {
        url: {
            type: String,
            required: [true, 'Video URL is required'],
        },
        cloudinaryId: {
            type: String,
            required: [true, 'Cloudinary ID is required'],
        },
        thumbnail: String,
        duration: Number,
    },
    overlayTitle: {
        type: String,
        default: 'Welcome to SVI School',
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    overlaySubtitle: {
        type: String,
        default: 'Nurturing Excellence, Shaping Futures',
        maxlength: [200, 'Subtitle cannot exceed 200 characters'],
    },
    ctaText: {
        type: String,
        default: 'Apply Now',
        maxlength: [50, 'CTA text cannot exceed 50 characters'],
    },
    ctaLink: {
        type: String,
        default: '/admissions',
    },
    secondaryCta: {
        type: String,
        default: 'Learn More',
        maxlength: [50, 'Secondary CTA text cannot exceed 50 characters'],
    },
    secondaryCtaLink: {
        type: String,
        default: '/about',
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

module.exports = mongoose.model('Hero', heroSchema);
