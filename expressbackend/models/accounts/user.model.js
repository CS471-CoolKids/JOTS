import { DataTypes } from 'sequelize';

/**
 * Represents a user
 * 
 * @property {number} id - The unique ID of the user
 * @property {string} name - The name of the user
 * @property {string} email - The email of the user
 * @property {string} password - The hashed password of the user
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const UserModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'user_id'
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
        tableName: 'user',
        timestamps: false
    });
};

export default UserModel;
