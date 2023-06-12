import { DataTypes } from 'sequelize';

/**
 * Represents a time slot.
 *
 * @property {number} id - The unique ID of the time slot.
 * @property {number} userId - The ID of the user associated with the time slot.
 * @property {string} startTime - The starting time of the time slot.
 * @property {string} endTime - The ending time of the time slot.
 * @property {number} status - The status of the time slot.
 * @property {Date} startDate - The start date of the time slot.
 * @property {Date} endDate - The end date of the time slot.
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const TimeSlotModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'time_slot',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'timeslot_id',
            },
            userId: {
                type: DataTypes.INTEGER,
                field: 'user_id',
            },
            startTime: {
                type: DataTypes.TIME,
                field: 'start_time',
            },
            endTime: {
                type: DataTypes.TIME,
                field: 'end_time',
            },
            status: {
                type: DataTypes.TINYINT,
                field: 'status',
            },
            startDate: {
                type: DataTypes.DATEONLY,
                field: 'start_date',
            },
            endDate: {
                type: DataTypes.DATEONLY,
                field: 'end_date',
            },
        },
        {
            tableName: 'time_slot',
            timestamps: false,
        }
    );
};

export default TimeSlotModel;
