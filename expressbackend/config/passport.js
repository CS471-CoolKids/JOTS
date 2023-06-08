import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import { db } from './database.js'

export default function configurePassport(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            const models = [db.students, db.tutors];

            let promiseArray = models.map(model => model.findOne({ where: { email } }));

            Promise.all(promiseArray)
                .then(results => {
                    let userIndex = results.findIndex(result => result !== null);

                    if (userIndex == -1) {
                        return done(null, false, { message: 'Incorrect email.' });
                    }

                    let user = results[userIndex];
                    user.role = models[userIndex].name;

                    compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                    });
                })
                .catch(err => done(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, { id: user.id, modelName: user.constructor.name });
    });

    passport.deserializeUser(({ id, modelName }, done) => {
        let model;
        switch (modelName) {
            case 'student':
                model = db.students;
                break;
            case 'tutor':
                model = db.tutors;
                break;
        }

        model.findByPk(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });
};
