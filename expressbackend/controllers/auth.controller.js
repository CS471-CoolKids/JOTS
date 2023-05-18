import bcryptjs from 'bcryptjs';
const { genSalt, hash } = bcryptjs;
import passport from 'passport';
import { db } from '../config/database.js'
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { role, email, password, firstName, lastName } = req.body;

    const models = { 'student': db.students, 'tutor': db.tutors };

    let promiseArray = Object.values(models).map(model => model.findOne({ where: { email } }));

    const existingUser = await Promise.all(promiseArray)
        .then(results => results.find(result => result !== null))
        .catch(err => {
            // Handle error
            console.log(err);
        });

    if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
    }

    // Server-side password hashing
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Determine the model to use based on the role
    const model = models[role.toLowerCase()];

    if (!model) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Create the new user with the hashed password
    const newUser = await model.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    });

    res.status(201).json({ message: "Registration successful" });
};


const login = (req, res, next) => {
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

            // Generate the token
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.TOKEN_SECRET_KEY);

            res.status(200).json({ message: 'Login successful', token });
        });
    })(req, res, next);
};

const authenticateToken = (userRoles) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {

            if (err) {
                // Handle invalid token
                return res.sendStatus(403);
            }

            // Store the decoded token or user information in the request object for later use
            req.user = decoded;

            // Check if userRoles are provided and match the decoded role
            if (userRoles && !userRoles.includes(decoded.role)) {
                // Unauthorized user role
                return res.sendStatus(401);
            }

            // Proceed to the next middleware or route handler
            next();
        });
    } else {
        // Handle missing token
        res.sendStatus(401);
    }
};

export { register, login, authenticateToken };
