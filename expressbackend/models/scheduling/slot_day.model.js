import { DataTypes } from 'sequelize';

/**
 * Represents a time slot day of the week.
 *
 * @property {number} id - The unique ID of the time slot.
 * @property {number} dayOfWeek - The day of the week, 1 to 7, Sunday to Saturday
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const SlotDayModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'slot_day',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'slot_id',
            },
            dayOfWeek: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'day_of_week',
            }
        },
        {
            tableName: 'slot_day',
            timestamps: false,
        }
    );
};

export default SlotDayModel;
