const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const { isAdmin, isEditor } = require('../middleware/roleCheck');

// Admin/Editor only
router.get('/stats', protect, isEditor, getStats);

module.exports = router;
