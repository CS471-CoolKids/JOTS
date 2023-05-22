import { DataTypes } from 'sequelize';

/**
 * Represents a tutor
 * 
 * @property {number} id - The unique ID of the tutor
 * @property {string} email - The email of the tutor
 * @property {string} password - The password of the tutor
 * @property {string} firstName - The first name of the tutor
 * @property {string} lastName - The last name of the tutor
 * @property {string} credentials - The credentials of the tutor
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
            field: 'TutorID'
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
        },
        credentials: {
            type: DataTypes.STRING(255),
            field: 'Credentials'
        }
    }, {
        tableName: 'tutor',
        timestamps: false
    });
};

export default TutorModel;
