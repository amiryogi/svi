const Program = require('../models/Program');
const { deleteFromCloudinary } = require('../utils/cloudinaryHelper');

/**
 * @desc    Get all programs
 * @route   GET /api/programs
 * @access  Public
 */
const getPrograms = async (req, res, next) => {
    try {
        const { level, stream, active } = req.query;

        const query = {};

        // Only show active for public
        if (!req.user) {
            query.active = true;
        } else if (active !== undefined) {
            query.active = active === 'true';
        }

        if (level) {
            query.level = level;
        }

        if (stream) {
            query.stream = stream;
        }

        const programs = await Program.find(query).sort('level order');

        res.json({
            success: true,
            count: programs.length,
            data: programs,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single program
 * @route   GET /api/programs/:id
 * @access  Public
 */
const getProgram = async (req, res, next) => {
    try {
        const program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        res.json({
            success: true,
            data: program,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create program
 * @route   POST /api/programs
 * @access  Admin
 */
const createProgram = async (req, res, next) => {
    try {
        const { name, subtitle, description, level, stream, subjects, features, order, active } = req.body;

        const programData = {
            name,
            subtitle,
            description,
            level,
            stream: stream || null,
            subjects: subjects ? JSON.parse(subjects) : [],
            features: features ? JSON.parse(features) : [],
            order: order || 0,
            active: active !== 'false',
        };

        // Handle image upload
        if (req.file) {
            programData.image = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        }

        const program = await Program.create(programData);

        res.status(201).json({
            success: true,
            data: program,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update program
 * @route   PUT /api/programs/:id
 * @access  Admin
 */
const updateProgram = async (req, res, next) => {
    try {
        let program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        const { name, subtitle, description, level, stream, subjects, features, order, active } = req.body;

        const updateData = {
            name,
            subtitle,
            description,
            level,
            stream: stream || null,
            order,
            active: active !== 'false',
        };

        if (subjects) {
            updateData.subjects = JSON.parse(subjects);
        }

        if (features) {
            updateData.features = JSON.parse(features);
        }

        // Handle new image upload
        if (req.file) {
            // Delete old image
            if (program.image?.cloudinaryId) {
                await deleteFromCloudinary(program.image.cloudinaryId);
            }

            updateData.image = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        }

        program = await Program.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            data: program,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete program
 * @route   DELETE /api/programs/:id
 * @access  Admin
 */
const deleteProgram = async (req, res, next) => {
    try {
        const program = await Program.findById(req.params.id);

        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        // Delete image from Cloudinary
        if (program.image?.cloudinaryId) {
            await deleteFromCloudinary(program.image.cloudinaryId);
        }

        await program.deleteOne();

        res.json({
            success: true,
            message: 'Program deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram,
};
