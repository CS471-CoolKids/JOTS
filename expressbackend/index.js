const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');

const tutorRoutes = require('./routes/tutor.routes');
const authRoutes = require('./routes/auth.routes');

/**
 * Reads environment variables
 */
dotenv.config();

/**
 * Creates Express App With Parser and Passport Authentication
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

/**
 * App Routes
 */
app.use('/tutors', tutorRoutes);
app.use('/auth', authRoutes);

/**
 * Serving
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
