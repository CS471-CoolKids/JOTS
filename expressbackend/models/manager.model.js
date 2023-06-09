import { DataTypes } from 'sequelize';

/**
 * Represents a manager
 * 
 * @property {number} id - The unique ID of the manager
 * @property {string} name - The first name of the manager
 * @property {string} email - The email of the manager
 * @property {string} password - The password of the manager
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const ManagerModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('manager', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'manager_id'
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
        tableName: 'manager',
        timestamps: false
    });
};

export default ManagerModel;
