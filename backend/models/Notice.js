const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    type: {
        type: String,
        enum: ['General', 'Admission', 'Holiday', 'Meeting', 'Event', 'Exam'],
        default: 'General',
    },
    attachment: {
        url: String,
        cloudinaryId: String,
        filename: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    expiresAt: {
        type: Date,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Index for active notices
noticeSchema.index({ active: 1, createdAt: -1 });

module.exports = mongoose.model('Notice', noticeSchema);
