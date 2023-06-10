import jwt from 'jsonwebtoken';
import { getUserRoles } from '../controllers/users.controller.js';

/**
 * Middleware to authenticate token
 * @param {Array} userRoles - User roles that are allowed to access the route (optional)
 */
export const populateUserFromToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = decoded;
            req.user.roles = await getUserRoles(decoded.id);

            next();
        });
    } else {
        next();
    }
};

/**
 * Middleware to check if the authenticated user has a manager role
 */
const checkManagerRole = (req, res, next) => {
    const currentUser = req.user;

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
