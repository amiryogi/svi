const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Unique ID for drag-n-drop
    label: { type: String, required: true },
    type: {
        type: String,
        enum: ['link', 'page'],
        default: 'link'
    },
    url: { type: String }, // For external or custom links
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
    // Recursive children for submenus
    children: [this] 
}, { _id: false }); // No _id for sub-items to keep structure clean, but 'id' field exists

const navigationSchema = new mongoose.Schema({
    items: [menuItemSchema],
    isMain: {
        type: Boolean,
        default: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Navigation', navigationSchema);
