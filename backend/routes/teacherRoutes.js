const express = require('express');
const router = express.Router();
const {
    getTeachers,
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');
const { uploadImage } = require('../middleware/upload');

// Public routes
router.get('/', getTeachers);
router.get('/:id', getTeacher);

// Admin only routes
router.post('/', protect, isAdmin, uploadImage.single('image'), createTeacher);
router.put('/:id', protect, isAdmin, uploadImage.single('image'), updateTeacher);
router.delete('/:id', protect, isAdmin, deleteTeacher);

module.exports = router;
