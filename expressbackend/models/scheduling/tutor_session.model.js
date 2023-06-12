import { DataTypes } from 'sequelize';

/**
 * Represents a tutor session.
 *
 * @property {number} id - The unique ID of the session.
 * @property {number} tutorId - The unique ID of the tutor.
 * @property {number} studentId - The unique ID of the student.
 * @property {string} courseId - The ID of the course related to the session.
 * @property {Date} scheduledDate - The scheduled date of the session.
 * @property {string} startTime - The starting time of the session.
 * @property {string} endTime - The ending time of the session.
 * @property {number} iterations - The number of iterations.
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const TutorSessionModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'tutor_session',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'session_id',
            },
            tutorId: {
                type: DataTypes.INTEGER,
                field: 'tutor_id',
            },
            studentId: {
                type: DataTypes.INTEGER,
                field: 'student_id',
            },
            courseId: {
                type: DataTypes.STRING(100),
                field: 'course_id',
            },
            scheduledDate: {
                type: DataTypes.DATEONLY,
                field: 'scheduled_date',
            },
            startTime: {
                type: DataTypes.TIME,
                field: 'start_time',
            },
            endTime: {
                type: DataTypes.TIME,
                field: 'end_time',
            },
            iterations: {
                type: DataTypes.INTEGER,
                field: 'iterations',
            },
        },
        {
            tableName: 'tutor_session',
            timestamps: false,
        }
    );
};

export default TutorSessionModel;
