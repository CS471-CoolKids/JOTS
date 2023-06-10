import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import { db, sequelize } from '../config/database.js';
import { getUserRoles } from './users.controller.js';
const userModel = db.user;
const studentModel = db.student;
const tutorModel = db.tutor;
const managerModel = db.manager;

const register = async (req, res) => {
    const { role, email, password, name } = req.body;

    const validRoles = ['student', 'tutor'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be student or tutor.' });
    }

    try {
        await createUser(name, email, password, role);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const registerManager = async (req, res) => {
    const { name, email, password } = req.body;
    const currentUser = req.user;

    // Check if the user calling the function is a manager
    if (!currentUser.roles.includes('manager')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        // Check if the email is already registered
        const existingUser = await userModel.findOne({ where: { email } });

        if (existingUser) {
            await managerModel.create({ id: existingUser.id });
            return res.status(200).json({ message: 'User has been assigned as a manager' });
        } else {
            try {
                await createUser(name, email, password, 'manager');
                res.status(201).json({ message: 'Registration of manager successful' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    userModel
        .findOne({ where: { email } })
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            // Compare the password
            bcrypt.compare(password, user.password, async (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (isMatch) {
                    // Fetch the roles for the user
                    const roles = await getUserRoles(user.id);

                    // Generate a JWT token
                    const token = jwt.sign(
                        { id: user.id, email: user.email, roles },
                        process.env.TOKEN_SECRET_KEY
                    );

                    res.status(200).json({ message: 'Login successful', token, roles });
                } else {
                    res.status(401).json({ message: 'Incorrect email or password' });
                }
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const addRole = async (req, res) => {
    const currentUser = req.user;
    const { role } = req.params;

    const userId = parseInt(req.params.userId, 10); // Convert userId to a number

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    if (userId !== currentUser.id && !currentUser.roles.includes('manager')) {
        // Users can only remove their own roles, unless they are a manager
        return res.status(403).json({ message: 'Unauthorized' });
    }

    let user;
    try {
        user = await userModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let roleModel;
        if (role === 'student') {
            roleModel = studentModel;
        } else if (role === 'tutor') {
            roleModel = tutorModel;
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if the user already has the role
        let userWithRole = await roleModel.findByPk(user.id);
        if (userWithRole) {
            return res.status(400).json({ message: 'User already has role' });
        }

        // add the user to the role table
        await roleModel.create({
            id: user.id
        });

        res.status(200).json({ message: 'Role has been added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeRole = async (req, res) => {
    const currentUser = req.user;
    const { role } = req.params;

    const userId = parseInt(req.params.userId, 10); // Convert userId to a number

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
    }

    if (userId !== currentUser.id && !currentUser.roles.includes('manager')) {
        // Users can only remove their own roles, unless they are a manager
        return res.status(403).json({ message: 'Unauthorized' });
    }

    if (userId !== currentUser.id && role === 'manager') {
        // Managers cannot remove the manager role of others
        return res.status(400).json({ message: 'Unauthorized to remove this role' });
    }

    let user;
    try {
        user = await userModel.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let roleModel;
        if (role === 'student') {
            roleModel = studentModel;
        } else if (role === 'tutor') {
            roleModel = tutorModel;
        } else if (role === 'manager') {
            roleModel = managerModel;
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if the user has any other roles
        const countStudentRoles = await studentModel.count({ where: { id: user.id } });
        const countTutorRoles = await tutorModel.count({ where: { id: user.id } });
        const countManagerRoles = await managerModel.count({ where: { id: user.id } });

        const remainingRoles = countStudentRoles + countTutorRoles + countManagerRoles;

        if (remainingRoles <= 1) {
            // User cannot remove their last role
            return res.status(400).json({ message: 'Cannot remove the last role. Please delete the user instead.' });
        }

        console.log("Model status: " + roleModel);

        // Remove the role entry for the user
        await roleModel.destroy({ where: { id: user.id } });

        res.status(200).json({ message: 'Role has been removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
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

const createUser = async (name, email, password, role) => {
    const roleModel = role === 'student' ? studentModel : role === 'tutor' ? tutorModel : managerModel;

    // Check if the email is already registered
    const existingUser = await userModel.findOne({ where: { email } });

    if (existingUser) {
        throw new Error('Email is already registered');
    }

    // Create the new user with the hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
        email,
        password: hashedPassword,
        name
    });

    // Create the role entry for the user
    await roleModel.create({ id: newUser.id });
};

export { register, registerManager, login, addRole, removeRole, deleteUser };
