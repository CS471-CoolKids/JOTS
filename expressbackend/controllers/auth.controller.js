import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import { db, sequelize } from '../config/database.js';
import { createUser, getUserRoles } from './users.controller.js';
const userModel = db.user;

export const register = async (req, res) => {
    const { roles, email, password, name } = req.body;

    let userRoles = roles;
    if (!userRoles) {
        userRoles = ['student'];
    }

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing Attributes. Must have name, email, password, and role' });
    }

    const validRoles = ['student', 'tutor', 'manager'];
    if (!userRoles.every((role) => validRoles.includes(role))) {
        return res.status(400).json({ message: 'Invalid role. Must be student, tutor, or manager.' });
    }

    if (userRoles.includes('manager')) {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorizaed' });
        }

        if (!req.user.roles.includes('manager')) {
            return res.status(401).json({ message: 'Unauthorized to add manager role.' });
        }
    }

    try {
        await createUser(name, email, password, userRoles);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = (req, res) => {
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
                    const roles = await getUserRoles(user.id);
                    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, roles }, process.env.TOKEN_SECRET_KEY);
                    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, roles }, token });
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

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
