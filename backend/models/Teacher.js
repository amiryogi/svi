const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        trim: true,
    },
    department: {
        type: String,
        enum: ['Management', 'Science', 'Mathematics', 'Languages', 'Primary', 'Kindergarten', 'Administration', 'Other'],
        required: [true, 'Department is required'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        trim: true,
    },
    qualification: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    },
    image: {
        url: String,
        cloudinaryId: String,
    },
    socialLinks: {
        facebook: String,
        linkedin: String,
        twitter: String,
    },
    order: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
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
teacherSchema.index({ department: 1, order: 1 });
teacherSchema.index({ active: 1 });
teacherSchema.index({ featured: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);
