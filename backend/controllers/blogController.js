const Blog = require('../models/Blog');
const { deleteFromCloudinary } = require('../utils/cloudinaryHelper');

/**
 * @desc    Get all blogs
 * @route   GET /api/blogs
 * @access  Public
 */
const getBlogs = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            status,
            featured,
            search
        } = req.query;

        // Build query
        const query = {};

        // Only show published for public
        if (!req.user) {
            query.status = 'published';
        } else if (status) {
            query.status = status;
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        if (featured === 'true') {
            query.featured = true;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const blogs = await Blog.find(query)
            .populate('author', 'name avatar')
            .sort('-createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Blog.countDocuments(query);

        res.json({
            success: true,
            count: blogs.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: blogs,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single blog by slug
 * @route   GET /api/blogs/:slug
 * @access  Public
 */
const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug })
            .populate('author', 'name avatar');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if unpublished and not admin
        if (blog.status !== 'published' && !req.user) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Increment views
        blog.views += 1;
        await blog.save();

        res.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create blog
 * @route   POST /api/blogs
 * @access  Admin/Editor
 */
const createBlog = async (req, res, next) => {
    try {
        const { title, content, excerpt, category, youtubeUrl, socialLinks, status, featured } = req.body;

        const blogData = {
            title,
            content,
            excerpt,
            category,
            youtubeUrl,
            socialLinks: socialLinks ? JSON.parse(socialLinks) : [],
            status: status || 'draft',
            featured: featured === 'true',
            author: req.user.id,
        };

        // Handle image upload
        if (req.file) {
            blogData.image = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        }

        const blog = await Blog.create(blogData);
        await blog.populate('author', 'name avatar');

        res.status(201).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update blog
 * @route   PUT /api/blogs/:id
 * @access  Admin/Editor
 */
const updateBlog = async (req, res, next) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const { title, content, excerpt, category, youtubeUrl, socialLinks, status, featured } = req.body;

        const updateData = {
            title,
            content,
            excerpt,
            category,
            youtubeUrl,
            status,
            featured: featured === 'true',
        };

        if (socialLinks) {
            updateData.socialLinks = JSON.parse(socialLinks);
        }

        // Handle new image upload
        if (req.file) {
            // Delete old image
            if (blog.image?.cloudinaryId) {
                await deleteFromCloudinary(blog.image.cloudinaryId);
            }

            updateData.image = {
                url: req.file.path,
                cloudinaryId: req.file.filename,
            };
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        }).populate('author', 'name avatar');

        res.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete blog
 * @route   DELETE /api/blogs/:id
 * @access  Admin
 */
const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Delete image from Cloudinary
        if (blog.image?.cloudinaryId) {
            await deleteFromCloudinary(blog.image.cloudinaryId);
        }

        // Delete video from Cloudinary
        if (blog.video?.cloudinaryId) {
            await deleteFromCloudinary(blog.video.cloudinaryId, 'video');
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
};
