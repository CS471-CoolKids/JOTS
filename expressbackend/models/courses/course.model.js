import { DataTypes } from 'sequelize';

/**
 * Represents a course
 * 
 * @property {string} id - The unique ID of the course
 * @property {string} name - The name of the course
 * @property {string} manager_id - The id of the manager for the course
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const CourseModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('course', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'course_id'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: 'name'
        },
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'manager_id'
        }
    }, {
        tableName: 'course',
        timestamps: false
    });
};

export default CourseModel;
