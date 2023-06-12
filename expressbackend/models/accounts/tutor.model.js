import { DataTypes } from 'sequelize';

/**
 * Represents a tutor
 * 
 * @property {number} id - The unique ID of the tutor
 * @property {string} resume - The resume of the tutor
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const TutorModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('tutor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'user_id'
        },
        resume: {
            type: DataTypes.STRING(255),
            field: 'resume'
        }
    }, {
        tableName: 'tutor',
        timestamps: false
    });
};

export default TutorModel;
