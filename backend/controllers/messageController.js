const Message = require('../models/Message');

/**
 * @desc    Submit message (public)
 * @route   POST /api/messages
 * @access  Public
 */
const submitMessage = async (req, res, next) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const newMessage = await Message.create({
            name,
            email,
            phone,
            subject,
            message,
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully. We will get back to you soon.',
            data: newMessage,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Admin
 */
const getMessages = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, read, search } = req.query;

        const query = {};

        if (read !== undefined) {
            query.read = read === 'true';
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
            ];
        }

        const messages = await Message.find(query)
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Message.countDocuments(query);
        const unreadCount = await Message.countDocuments({ read: false });

        res.json({
            success: true,
            count: messages.length,
            total,
            unreadCount,
            pages: Math.ceil(total / limit),
            data: messages,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single message
 * @route   GET /api/messages/:id
 * @access  Admin
 */
const getMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Mark as read
        if (!message.read) {
            message.read = true;
            await message.save();
        }

        res.json({
            success: true,
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Mark message as read/unread
 * @route   PATCH /api/messages/:id
 * @access  Admin
 */
const updateMessage = async (req, res, next) => {
    try {
        const { read, replied } = req.body;

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read, replied },
            { new: true, runValidators: true }
        );

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({
            success: true,
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete message
 * @route   DELETE /api/messages/:id
 * @access  Admin
 */
const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await message.deleteOne();

        res.json({
            success: true,
            message: 'Message deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Mark all as read
 * @route   PATCH /api/messages/mark-all-read
 * @access  Admin
 */
const markAllAsRead = async (req, res, next) => {
    try {
        await Message.updateMany({ read: false }, { read: true });

        res.json({
            success: true,
            message: 'All messages marked as read',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
    markAllAsRead,
};
