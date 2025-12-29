const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Program name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: [100, 'Subtitle cannot exceed 100 characters'],
    },
    description: {
        type: String,
    },
    level: {
        type: String,
        enum: ['KG', 'Primary', 'Middle', 'Secondary', 'NEB'],
        required: [true, 'Level is required'],
    },
    stream: {
        type: String,
        enum: ['Science', 'Management', null],
        default: null,
    },
    subjects: [{
        type: String,
        trim: true,
    }],
    features: [{
        type: String,
        trim: true,
    }],
    image: {
        url: String,
        cloudinaryId: String,
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

// Index for ordering
programSchema.index({ level: 1, order: 1 });
programSchema.index({ active: 1 });

module.exports = mongoose.model('Program', programSchema);
