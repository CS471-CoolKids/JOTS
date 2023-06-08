import { DataTypes } from 'sequelize';

/**
 * Represents a course
 * 
 * @property {string} id - The unique ID of the course
 * @property {string} name - The name of the course
 * @property {string} textbook - The textbook for the course
 * @property {string} homework - The homework problems for the course
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const CourseModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('course', {
        id: {
            type: DataTypes.STRING(9),
            primaryKey: true,
            field: 'CourseID'
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
            field: 'CourseName'
        },
        textbook: {
            type: DataTypes.STRING(45),
            field: 'Textbook'
        },
        homework: {
            type: DataTypes.STRING(255),
            field: 'HomeworkProblems'
        }
    }, {
        tableName: 'course',
        timestamps: false
    });
};

export default CourseModel;
