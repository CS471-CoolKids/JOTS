import express from 'express';
import body_parser from 'body-parser';
const { json, urlencoded } = body_parser;
import cors from 'cors';
import { config } from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import configurePassport from './config/passport.js';
import swaggerUi from 'swagger-ui-express';


/**
 * Import Routes
 */
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import coursesRoutes from './routes/courses.routes.js'

import fs from 'fs';
import yaml from 'js-yaml';

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));


/**
 * Reads environment variables
 */
config();

/**
 * Creates Express App With Parser and Passport Authentication
 */
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.APP_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

/**
 * App Routes
 */
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Serving
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
