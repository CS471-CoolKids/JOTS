import { DataTypes } from 'sequelize';

/**
 * Represents a student
 * 
 * @property {number} id - The unique ID of the student
 * @property {string} email - The email of the student
 * @property {string} password - The password of the student
 * @property {string} firstName - The first name of the student
 * @property {string} lastName - The last name of the student
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
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
            field: 'Email'
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'Password'
        },
        firstName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'FName'
        },
        lastName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            field: 'LName'
        }
    }, {
        tableName: 'student',
        timestamps: false
    });
};

export default StudentModel;
