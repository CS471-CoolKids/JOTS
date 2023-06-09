import { DataTypes } from 'sequelize';

/**
 * Represents a manager
 * 
 * @property {number} id - The unique ID of the manager
 * 
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const ManagerModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define('manager', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'user_id'
        }
    }, {
        tableName: 'manager',
        timestamps: false
    });
};

export default ManagerModel;
