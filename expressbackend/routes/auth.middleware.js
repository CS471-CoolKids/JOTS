import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate token
 * @param {Array} userRoles - User roles that are allowed to access the route (optional)
 */
const authenticateToken = (userRoles) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = decoded;

            if (userRoles && !userRoles.some(role => decoded.roles.includes(role))) {
                return res.sendStatus(401);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};

/**
 * Middleware to check if the authenticated user has a manager role
 */
const checkManagerRole = (req, res, next) => {
    const currentUser = req.user;

    console.log("Manager Check User: " + currentUser);

    if (!currentUser.roles.includes('manager')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
};

/**
 * Middleware to check if the authenticated user's ID matches the requested userId
 */
const checkSelfUser = (req, res, next) => {
    const currentUser = req.user;
    const requestedUserId = req.params.userId;

    if (currentUser.id !== parseInt(requestedUserId)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

export { authenticateToken, checkManagerRole, checkSelfUser };
