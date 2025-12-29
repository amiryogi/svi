const Blog = require('../models/Blog');
const Notice = require('../models/Notice');
const Gallery = require('../models/Gallery');
const Teacher = require('../models/Teacher');
const Inquiry = require('../models/Inquiry');
const Message = require('../models/Message');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Admin
 */
const getStats = async (req, res, next) => {
    try {
        // Get counts
        const [
            totalBlogs,
            publishedBlogs,
            totalNotices,
            activeNotices,
            totalGallery,
            totalTeachers,
            totalInquiries,
            newInquiries,
            totalMessages,
            unreadMessages,
        ] = await Promise.all([
            Blog.countDocuments(),
            Blog.countDocuments({ status: 'published' }),
            Notice.countDocuments(),
            Notice.countDocuments({ active: true }),
            Gallery.countDocuments(),
            Teacher.countDocuments({ active: true }),
            Inquiry.countDocuments(),
            Inquiry.countDocuments({ status: 'New' }),
            Message.countDocuments(),
            Message.countDocuments({ read: false }),
        ]);

        // Get recent items
        const recentInquiries = await Inquiry.find()
            .sort('-createdAt')
            .limit(5)
            .select('studentName grade status createdAt');

        const recentMessages = await Message.find()
            .sort('-createdAt')
            .limit(5)
            .select('name subject read createdAt');

        // Get inquiry status breakdown
        const inquiryStats = await Inquiry.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        // Get monthly data for chart (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyInquiries = await Inquiry.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ]);

        res.json({
            success: true,
            data: {
                counts: {
                    blogs: { total: totalBlogs, published: publishedBlogs },
                    notices: { total: totalNotices, active: activeNotices },
                    gallery: totalGallery,
                    teachers: totalTeachers,
                    inquiries: { total: totalInquiries, new: newInquiries },
                    messages: { total: totalMessages, unread: unreadMessages },
                },
                recentInquiries,
                recentMessages,
                inquiryStats: inquiryStats.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {}),
                monthlyInquiries,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats,
};
