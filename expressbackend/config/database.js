import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import TutorModel from '../models/tutor.model.js'
import StudentModel from '../models/student.model.js';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

const db = {};

db.sequelize = sequelize;

db.tutors = TutorModel(sequelize);
db.students = StudentModel(sequelize);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export { db, sequelize };
export default db;
