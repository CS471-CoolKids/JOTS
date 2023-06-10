import { db } from '../config/database.js';
const userModel = db.user;
const studentModel = db.student;
const tutorModel = db.tutor;
const managerModel = db.manager;
import bcrypt from 'bcryptjs';

/**
 * Get user by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getUserById = async (req, res) => {
    const userId = req.params.userId;
    const currentUser = req.user;

    // Check if the authenticated user is a manager or the requested user
    if (currentUser.roles.includes('manager') || currentUser.id === parseInt(userId)) {
        try {
            const user = await userModel.findByPk(userId, {
                attributes: { exclude: ['password'] }, // Exclude the password field
                include: [{ model: studentModel }, { model: tutorModel }, { model: managerModel }]
            });
            if (user) {
                const roles = [];

                if (user.student) {
                    roles.push('student');
                }
                if (user.tutor) {
                    roles.push('tutor');
                }
                if (user.manager) {
                    roles.push('manager');
                }
                res.status(200).json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        roles,
                    }
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

/**
 * Get all users
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 */
const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAll({
            attributes: { exclude: ['password'] }, // Exclude the password field
            include: [{ model: studentModel }, { model: tutorModel }, { model: managerModel }]
        });

        const usersWithRoles = users.map((user) => {
            const roles = [];

            if (user.student) {
                roles.push('student');
            }
            if (user.tutor) {
                roles.push('tutor');
            }
            if (user.manager) {
                roles.push('manager');
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                roles,
            };
        });

        // Return all users
        res.status(200).json({ users: usersWithRoles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Update user password
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateUserPassword = async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await userModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the current password
        bcrypt.compare(currentPassword, user.password, async (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (isMatch) {
                // Hash the new password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                // Update the password
                try {
                    await user.update({ password: hashedPassword });
                    res.status(200).json({ message: 'Password updated' });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal server error' });
                }
            } else {
                res.status(401).json({ message: 'Incorrect current password' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserRoles = async (userId) => {
    try {
        const roles = [];

        const isStudent = await studentModel.findOne({ where: { id: userId } });
        const isTutor = await tutorModel.findOne({ where: { id: userId } });
        const isManager = await managerModel.findOne({ where: { id: userId } });

        if (isStudent) {
            roles.push('student');
        }
        if (isTutor) {
            roles.push('tutor');
        }
        if (isManager) {
            roles.push('manager');
        }

        return roles;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve roles');
    }
};

export { getUserById, getUsers, updateUserPassword, getUserRoles };
