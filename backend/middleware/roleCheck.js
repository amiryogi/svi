/**
 * Role-based access control middleware
 * @param  {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role '${req.user.role}' is not authorized to access this route`
            });
        }

        next();
    };
};

/**
 * Check if user is Admin
 */
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }

    next();
};

/**
 * Check if user is Admin or Editor
 */
const isEditor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    if (!['Admin', 'Editor'].includes(req.user.role)) {
        return res.status(403).json({ message: 'Editor or Admin access required' });
    }

    next();
};

module.exports = { authorize, isAdmin, isEditor };
