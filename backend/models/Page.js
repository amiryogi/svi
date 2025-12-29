const mongoose = require('mongoose');
const slugify = require('slugify');

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    metaDescription: {
        type: String,
        default: '',
        maxlength: [160, 'Meta description cannot be more than 160 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create page slug from the title
pageSchema.pre('save', async function() {
    if (!this.isModified('title')) {
        return;
    }
    this.slug = slugify(this.title, { lower: true });
});

module.exports = mongoose.model('Page', pageSchema);
