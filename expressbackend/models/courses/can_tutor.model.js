import { DataTypes } from 'sequelize';

/**
 * Represents a record indicating if a tutor can teach a course.
 *
 * @property {number} tutorId - The ID of the tutor.
 * @property {number} courseId - The ID of the course.
 * @property {number} approved - Indicates if the tutor is approved to teach the course.
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const CanTutorModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'can_tutor',
        {
            tutorId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'tutor_id',
            },
            courseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'course_id',
            },
            approved: {
                type: DataTypes.TINYINT,
                allowNull: false,
                field: 'approved',
            },
        },
        {
            tableName: 'can_tutor',
            timestamps: false,
        }
    );
};

export default CanTutorModel;
