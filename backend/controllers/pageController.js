const Page = require('../models/Page');
const slugify = require('slugify');

/**
 * @desc    Get all pages
 * @route   GET /api/pages
 * @access  Public
 */
const getPages = async (req, res, next) => {
    try {
        const query = {};
        
        // If not admin, only show active pages
        if (!req.user || req.user.role !== 'admin') {
            query.isActive = true;
        }

        const pages = await Page.find(query).sort('-createdAt');

        res.json({
            success: true,
            count: pages.length,
            data: pages,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single page by slug
 * @route   GET /api/pages/:slug
 * @access  Public
 */
const getPageBySlug = async (req, res, next) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        if (!page.isActive && (!req.user || req.user.role !== 'admin')) {
            return res.status(404).json({ message: 'Page not found' });
        }

        res.json({
            success: true,
            data: page,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create page
 * @route   POST /api/pages
 * @access  Admin
 */
const createPage = async (req, res, next) => {
    try {
        console.log('Creating page with data:', req.body);
        const page = await Page.create(req.body);

        res.status(201).json({
            success: true,
            data: page,
        });
    } catch (error) {
        console.error('Page creation error:', error);
        next(error);
    }
};

/**
 * @desc    Update page
 * @route   PUT /api/pages/:id
 * @access  Admin
 */
const updatePage = async (req, res, next) => {
    try {
        let page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        // If title changed, update slug
        if (req.body.title && req.body.title !== page.title) {
            req.body.slug = slugify(req.body.title, { lower: true });
        }

        page = await Page.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json({
            success: true,
            data: page,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete page
 * @route   DELETE /api/pages/:id
 * @access  Admin
 */
const deletePage = async (req, res, next) => {
    try {
        const page = await Page.findById(req.params.id);

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        await page.deleteOne();

        res.json({
            success: true,
            message: 'Page deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPages,
    getPageBySlug,
    createPage,
    updatePage,
    deletePage,
};
