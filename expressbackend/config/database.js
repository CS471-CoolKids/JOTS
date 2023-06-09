import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
// Accounts
import UserModel from '../models/accounts/user.model.js';
import TutorModel from '../models/accounts/tutor.model.js';
import StudentModel from '../models/accounts/student.model.js';
import ManagerModel from '../models/accounts/manager.model.js';
// Courses
import CourseModel from '../models/courses/course.model.js'
import CanTutorModel from '../models/courses/can_tutor.model.js';
import DesiresTutorForModel from '../models/courses/course.model copy.js';
// Ratings
import StudentRatingTutorModel from '../models/ratings/student_rating_tutor.model.js';
import TutorRatingStudentModel from '../models/ratings/tutor_rating_student.model.js';
// Scheduling
import TutorSessionModel from '../models/scheduling/tutor_session.model.js';
import SessionDayModel from '../models/scheduling/session_day.model.js';
import TimeSlotModel from '../models/scheduling/time_slot.model.js';
import SlotDayModel from '../models/scheduling/slot_day.model.js';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

const db = {};

db.sequelize = sequelize;
// Accounts
db.user = UserModel(sequelize);
db.tutor = TutorModel(sequelize);
db.student = StudentModel(sequelize);
db.manager = ManagerModel(sequelize);
// Courses
db.course = CourseModel(sequelize);
db.can_tutor = CanTutorModel(sequelize);
db.desires_tutor_for = DesiresTutorForModel(sequelize);
// Ratings
db.student_rating_tutor = StudentRatingTutorModel(sequelize);
db.tutor_rating_student = TutorRatingStudentModel(sequelize);
// Scheduling
db.tutor_session = TutorSessionModel(sequelize);
db.session_day = SessionDayModel(sequelize);
db.time_slot = TimeSlotModel(sequelize);
db.slot_day = SlotDayModel(sequelize);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export { db, sequelize };
export default db;
