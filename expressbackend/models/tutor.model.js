import { DataTypes } from 'sequelize';

/**
 * Represents a tutor
 * 
 * @property {number} id - The unique ID of the tutor
 * @property {string} name - The name of the tutor
 * @property {string} email - The email of the tutor
 * @property {string} password - The password of the tutor
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
            autoIncrement: true,
            field: 'tutor_id'
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
