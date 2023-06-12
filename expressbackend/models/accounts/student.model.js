import { DataTypes } from 'sequelize';

/**
 * Represents a student
 * 
 * @property {number} id - The unique ID of the student
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const StudentModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'user_id'
        }
    }, {
        tableName: 'student',
        timestamps: false
    });
};

export default StudentModel;
