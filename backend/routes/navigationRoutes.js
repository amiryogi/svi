const express = require('express');
const router = express.Router();
const {
    getNavigation,
    updateNavigation
} = require('../controllers/navigationController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Public routes
router.get('/', getNavigation);

// Admin only routes
router.put('/', protect, isAdmin, updateNavigation);

module.exports = router;
