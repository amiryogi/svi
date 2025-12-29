const Teacher = require('../models/Teacher');
const { deleteFromCloudinary } = require('../utils/cloudinaryHelper');

/**
 * @desc    Get all teachers
 * @route   GET /api/teachers
 * @access  Public
 */
const getTeachers = async (req, res, next) => {
    try {
        const { department, featured, active } = req.query;

        const query = {};

        // Only show active for public
        if (!req.user) {
            query.active = true;
        } else if (active !== undefined) {
            query.active = active === 'true';
        }

        if (department && department !== 'All') {
            query.department = department;
        }

        if (featured === 'true') {
            query.featured = true;
        }

        const teachers = await Teacher.find(query).sort('department order name');

        res.json({
            success: true,
            count: teachers.length,
            data: teachers,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single teacher
 * @route   GET /api/teachers/:id
 * @access  Public
 */
const getTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create teacher
 * @route   POST /api/teachers
 * @access  Admin
 */
const createTeacher = async (req, res, next) => {
    try {
        const {
            name, position, department, email, phone,
            qualification, bio, socialLinks, order, featured, active
        } = req.body;

        const teacherData = {
            name,
            position,
            department,
            email,
            phone,
            qualification,
            bio,
            socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
            order: order || 0,
            featured: featured === 'true',
            active: active !== 'false',
        };

        // Handle image upload
        if (req.file) {
            teacherData.image = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        }

        const teacher = await Teacher.create(teacherData);

        res.status(201).json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update teacher
 * @route   PUT /api/teachers/:id
 * @access  Admin
 */
const updateTeacher = async (req, res, next) => {
    try {
        let teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const {
            name, position, department, email, phone,
            qualification, bio, socialLinks, order, featured, active
        } = req.body;

        const updateData = {
            name,
            position,
            department,
            email,
            phone,
            qualification,
            bio,
            order,
            featured: featured === 'true',
            active: active !== 'false',
        };

        if (socialLinks) {
            updateData.socialLinks = JSON.parse(socialLinks);
        }

        // Handle new image upload
        if (req.file) {
            // Delete old image
            if (teacher.image?.cloudinaryId) {
                await deleteFromCloudinary(teacher.image.cloudinaryId);
            }

            updateData.image = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        }

        teacher = await Teacher.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete teacher
 * @route   DELETE /api/teachers/:id
 * @access  Admin
 */
const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Delete image from Cloudinary
        if (teacher.image?.cloudinaryId) {
            await deleteFromCloudinary(teacher.image.cloudinaryId);
        }

        await teacher.deleteOne();

        res.json({
            success: true,
            message: 'Teacher deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};
