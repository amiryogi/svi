const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe,
    updateProfile,
    changePassword,
    getUsers
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

// Public routes
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/me', protect, updateProfile);
router.put('/password', protect, changePassword);

// Admin only routes
router.post('/register', protect, isAdmin, register);
router.get('/users', protect, isAdmin, getUsers);

module.exports = router;
