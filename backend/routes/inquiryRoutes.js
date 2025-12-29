const express = require('express');
const router = express.Router();
const {
    submitInquiry,
    getInquiries,
    getInquiry,
    updateInquiryStatus,
    deleteInquiry
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Public route
router.post('/', submitInquiry);

// Admin only routes
router.get('/', protect, isAdmin, getInquiries);
router.get('/:id', protect, isAdmin, getInquiry);
router.patch('/:id', protect, isAdmin, updateInquiryStatus);
router.delete('/:id', protect, isAdmin, deleteInquiry);

module.exports = router;
