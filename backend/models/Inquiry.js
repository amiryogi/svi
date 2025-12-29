const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    parentName: {
        type: String,
        required: [true, 'Parent/Guardian name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    grade: {
        type: String,
        required: [true, 'Grade/Class is required'],
        trim: true,
    },
    message: {
        type: String,
        maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Pending', 'Closed'],
        default: 'New',
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Index for status filtering
inquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
