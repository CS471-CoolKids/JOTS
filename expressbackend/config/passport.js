import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { db } from './database.js';
const userModel = db.user;

export default function configurePassport(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Check if the user exists in the database
            userModel
                .findOne({ where: { email } })
                .then(async (user) => {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect email or password' });
                    }

                    // Compare the password
                    bcrypt.compare(password, user.password, async (err, isMatch) => {
                        if (err) {
                            return done(err);
                        }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect email or password' });
                        }
                    });
                })
                .catch((err) => done(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userModel
            .findByPk(id)
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
}
