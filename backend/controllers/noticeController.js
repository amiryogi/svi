const Notice = require('../models/Notice');
const { deleteFromCloudinary } = require('../utils/cloudinaryHelper');

/**
 * @desc    Get all notices
 * @route   GET /api/notices
 * @access  Public
 */
const getNotices = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, type, active } = req.query;

        const query = {};

        // Only show active for public
        if (!req.user) {
            query.active = true;
            // Filter expired notices
            query.$or = [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gte: new Date() } },
            ];
        } else if (active !== undefined) {
            query.active = active === 'true';
        }

        if (type && type !== 'All') {
            query.type = type;
        }

        const notices = await Notice.find(query)
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Notice.countDocuments(query);

        res.json({
            success: true,
            count: notices.length,
            total,
            pages: Math.ceil(total / limit),
            data: notices,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single notice
 * @route   GET /api/notices/:id
 * @access  Public
 */
const getNotice = async (req, res, next) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        res.json({
            success: true,
            data: notice,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create notice
 * @route   POST /api/notices
 * @access  Admin/Editor
 */
const createNotice = async (req, res, next) => {
    try {
        const { title, content, type, active, expiresAt } = req.body;

        const noticeData = {
            title,
            content,
            type: type || 'General',
            active: active !== 'false',
            expiresAt: expiresAt || null,
        };

        // Handle attachment upload
        if (req.file) {
            noticeData.attachment = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
                filename: req.file.originalname,
            };
        }

        const notice = await Notice.create(noticeData);

        res.status(201).json({
            success: true,
            data: notice,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update notice
 * @route   PUT /api/notices/:id
 * @access  Admin/Editor
 */
const updateNotice = async (req, res, next) => {
    try {
        let notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        const { title, content, type, active, expiresAt } = req.body;

        const updateData = {
            title,
            content,
            type,
            active: active !== 'false',
            expiresAt: expiresAt || null,
        };

        // Handle new attachment upload
        if (req.file) {
            // Delete old attachment
            if (notice.attachment?.cloudinaryId) {
                await deleteFromCloudinary(notice.attachment.cloudinaryId);
            }

            updateData.attachment = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
                filename: req.file.originalname,
            };
        }

        notice = await Notice.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            data: notice,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete notice
 * @route   DELETE /api/notices/:id
 * @access  Admin
 */
const deleteNotice = async (req, res, next) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Delete attachment from Cloudinary
        if (notice.attachment?.cloudinaryId) {
            await deleteFromCloudinary(notice.attachment.cloudinaryId);
        }

        await notice.deleteOne();

        res.json({
            success: true,
            message: 'Notice deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNotices,
    getNotice,
    createNotice,
    updateNotice,
    deleteNotice,
};
