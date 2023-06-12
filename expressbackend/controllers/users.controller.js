import { db } from '../config/database.js';
import bcrypt from 'bcryptjs';
import { hashPassword } from './auth.controller.js';

const userModel = db.user;
const studentModel = db.student;
const tutorModel = db.tutor;
const managerModel = db.manager;

const roles = {
    STUDENT: 'student',
    TUTOR: 'tutor',
    MANAGER: 'manager',
};

const roleModels = {
    [roles.STUDENT]: studentModel,
    [roles.TUTOR]: tutorModel,
    [roles.MANAGER]: managerModel,
};

const roleHelper = {
    async createUserRoles(userId, roles) {
        for (const role of roles) {
            const model = roleModels[role];
            if (model) {
                await model.create({ id: userId });
            } else {
                console.log(`No Model found for "${role}"`);
            }
        }
    },

    async removeUserRoles(userId, roles) {
        for (const role of roles) {
            const model = roleModels[role];
            if (model) {
                await model.destroy({ where: { id: userId } });
            } else {
                console.log(`No Model found for "${role}"`);
            }
        }
    },
};

export const getUserRoles = async (userId) => {
    const userRoles = [];

    for (const [role, model] of Object.entries(roleModels)) {
        const isRole = await model.findOne({ where: { id: userId } });
        if (isRole) {
            userRoles.push(role);
        }
    }

    return userRoles;
}

const createUserAccount = async (email, hashedPassword, name) => {
    return await userModel.create({
        email,
        password: hashedPassword,
        name
    });
};

export const createUser = async (name, email, password, roles) => {
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUserAccount(email, hashedPassword, name);

    await roleHelper.createUserRoles(newUser.id, roles);
};


/**
 * Get user by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getUserById = async (req, res) => {
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
export const getUsers = async (req, res) => {
    if (!req.user || !req.user.roles.includes('manager')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

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
export const updateUser = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const { name, email, roles, currentPassword, newPassword } = req.body;

    try {
        const user = await userModel.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (
            ((!currentPassword && newPassword) ||
                userId !== req.user.id) && !req.user.roles.includes('manager')
        ) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        let updatedFields = [];
        let updates = {};

        if (name) {
            updatedFields.push('Name');
            updates.name = name;
        }

        if (email) {
            updatedFields.push('Email');
            updates.email = email;
        }

        if (newPassword) {
            if (req.user.roles.includes('manager')) {
                updatedFields.push('Password');
                updates.password = await hashPassword(newPassword);
            } else {
                // Compare the current password
                const isMatch = await bcrypt.compare(currentPassword, user.password);

                if (isMatch) {
                    updatedFields.push('Password');
                    updates.password = await hashPassword(newPassword);
                } else {
                    return res.status(401).json({ message: 'Incorrect current password' });
                }
            }
        }

        if (roles) {
            const validRoles = ['student', 'tutor', 'manager'];
            if (!roles.every((role) => validRoles.includes(role))) {
                return res.status(400).json({ message: 'Invalid role. Must be student, tutor, or manager.' });
            }

            if (roles.includes('manager') && !req.user.roles.includes('manager')) {
                return res.status(401).json({ message: 'Unauthorized to add manager role.' });
            }

            const currentRoles = await getUserRoles(user.id);
            const addedRoles = roles.filter(role => !currentRoles.includes(role));
            const removedRoles = currentRoles.filter(role => !roles.includes(role));

            updatedFields.push("Roles");

            await roleHelper.createUserRoles(user.id, addedRoles);
            await roleHelper.removeUserRoles(user.id, removedRoles);
        }

        // Update the user
        await user.update(updates);

        let message = 'User updated.';
        if (updatedFields.length > 0) {
            message += ` Updated fields: ${updatedFields.join(', ')}.`;
        }

        return res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUser = async (req, res) => {
    const currentUser = req.user;
    const userId = parseInt(req.params.userId, 10); // Convert userId to a number

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    try {
        if (userId !== currentUser.id && !currentUser.roles.includes('manager')) {
            // Users can only delete their own account, unless they are a manager
            return res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

    let user;
    try {
        user = await userModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user and associated roles
        await user.destroy();

        res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
