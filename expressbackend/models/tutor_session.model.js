import { DataTypes } from 'sequelize';

/**
 * Represents a tutor session
 * 
 * @property {number} tutorId - The unique ID of the tutor
 * @property {number} studentId - The unique ID of the student
 * @property {Date} startTime - The starting time of the session
 * @property {Date} endTime - The ending time of the session
 * @property {boolean} isRepeating - A boolean indicating if the session is repeating
 * @property {string} courseId - The ID of the course related to the session
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const TutorSessionModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('tutor_session', {
        tutorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'TutorID'
        },
        studentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'StudentID'
        },
        startTime: {
            type: DataTypes.DATE,
            field: 'StartTime'
        },
        endTime: {
            type: DataTypes.DATE,
            field: 'EndTime'
        },
        isRepeating: {
            type: DataTypes.TINYINT,
            field: 'LName'
        },
        courseId: {
            type: DataTypes.STRING(9),
            field: 'Course'
        }
    }, {
        tableName: 'tutor_session',
        timestamps: false
    });
};

export default TutorSessionModel;
