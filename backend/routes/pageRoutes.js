const express = require('express');
const router = express.Router();
const {
    getPages,
    getPageBySlug,
    createPage,
    updatePage,
    deletePage
} = require('../controllers/pageController');
const { protect, optionalAuth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Public routes
router.get('/', optionalAuth, getPages);
router.get('/:slug', optionalAuth, getPageBySlug);

// Admin only routes
router.post('/', protect, isAdmin, createPage);
router.put('/:id', protect, isAdmin, updatePage);
router.delete('/:id', protect, isAdmin, deletePage);

module.exports = router;
