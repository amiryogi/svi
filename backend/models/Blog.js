const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    excerpt: {
        type: String,
        maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    image: {
        url: String,
        cloudinaryId: String,
    },
    video: {
        url: String,
        cloudinaryId: String,
    },
    youtubeUrl: {
        type: String,
        trim: true,
    },
    socialLinks: [{
        platform: {
            type: String,
            enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'],
        },
        url: String,
    }],
    category: {
        type: String,
        enum: ['News', 'Events', 'Academic', 'Achievements', 'Announcements', 'Other'],
        default: 'News',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    featured: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Generate slug before saving
blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
    }
    next();
});

// Auto-generate excerpt from content if not provided
blogSchema.pre('save', function (next) {
    if (!this.excerpt && this.content) {
        // Strip HTML and truncate
        const stripped = this.content.replace(/<[^>]*>/g, '');
        this.excerpt = stripped.substring(0, 200) + (stripped.length > 200 ? '...' : '');
    }
    next();
});

// Index for search
blogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
