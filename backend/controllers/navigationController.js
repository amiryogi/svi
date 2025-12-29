const Navigation = require('../models/Navigation');

/**
 * @desc    Get main navigation
 * @route   GET /api/navigation
 * @access  Public
 */
const getNavigation = async (req, res, next) => {
    try {
        let navigation = await Navigation.findOne({ isMain: true });

        // populate page checks if needed, but for menu we might just rely on IDs and labels stored in items
        // or we can populate 'items.pageId' if we want to sync labels with page titles?
        // For now, let's keep it simple and just return the structure. Labels are stored in navigation.

        if (!navigation) {
            // Return empty structure if not initialized
            return res.json({
                success: true,
                data: { items: [] },
            });
        }

        res.json({
            success: true,
            data: navigation,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update navigation structure
 * @route   PUT /api/navigation
 * @access  Admin
 */
const updateNavigation = async (req, res, next) => {
    try {
        // Find or create main navigation
        const navigation = await Navigation.findOneAndUpdate(
            { isMain: true },
            { 
                items: req.body.items,
                isMain: true
            },
            { 
                new: true,
                upsert: true, // Create if doesn't exist
                runValidators: true
            }
        );

        res.json({
            success: true,
            data: navigation,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getNavigation,
    updateNavigation,
};
