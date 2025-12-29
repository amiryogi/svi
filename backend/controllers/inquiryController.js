const Inquiry = require('../models/Inquiry');

/**
 * @desc    Submit inquiry (public)
 * @route   POST /api/inquiries
 * @access  Public
 */
const submitInquiry = async (req, res, next) => {
    try {
        const { studentName, parentName, email, phone, grade, message } = req.body;

        const inquiry = await Inquiry.create({
            studentName,
            parentName,
            email,
            phone,
            grade,
            message,
            status: 'New',
        });

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully. We will contact you soon.',
            data: inquiry,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all inquiries
 * @route   GET /api/inquiries
 * @access  Admin
 */
const getInquiries = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status, search } = req.query;

        const query = {};

        if (status && status !== 'All') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { studentName: { $regex: search, $options: 'i' } },
                { parentName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const inquiries = await Inquiry.find(query)
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Inquiry.countDocuments(query);

        // Get status counts
        const statusCounts = await Inquiry.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        res.json({
            success: true,
            count: inquiries.length,
            total,
            pages: Math.ceil(total / limit),
            statusCounts: statusCounts.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            data: inquiries,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single inquiry
 * @route   GET /api/inquiries/:id
 * @access  Admin
 */
const getInquiry = async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update inquiry status
 * @route   PATCH /api/inquiries/:id
 * @access  Admin
 */
const updateInquiryStatus = async (req, res, next) => {
    try {
        const { status, notes } = req.body;

        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status, notes },
            { new: true, runValidators: true }
        );

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete inquiry
 * @route   DELETE /api/inquiries/:id
 * @access  Admin
 */
const deleteInquiry = async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        await inquiry.deleteOne();

        res.json({
            success: true,
            message: 'Inquiry deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitInquiry,
    getInquiries,
    getInquiry,
    updateInquiryStatus,
    deleteInquiry,
};
