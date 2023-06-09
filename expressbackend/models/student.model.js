import { DataTypes } from 'sequelize';

/**
 * Represents a student
 * 
 * @property {number} id - The unique ID of the student
 * @property {string} name - The first name of the student
 * @property {string} email - The email of the student
 * @property {string} password - The password of the student
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const StudentModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'StudentID'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'name'
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: 'email'
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'password'
        }
    }, {
        tableName: 'student',
        timestamps: false
    });
};

export default StudentModel;
