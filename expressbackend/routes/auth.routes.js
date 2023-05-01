const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
    }

    // Server-side password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user with the hashed password
    const newUser = await User.create({
        username,
        password: hashedPassword,
    });

    res.status(201).json(newUser);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res, next);
});

module.exports = router;
