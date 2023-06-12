import { DataTypes } from 'sequelize';

/**
 * Represents a student's rating for a tutor.
 *
 * @property {number} studentId - The ID of the student.
 * @property {number} tutorId - The ID of the tutor.
 * @property {number} rating - The rating given by the student to the tutor.
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const StudentRatingTutorModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'student_rating_tutor',
        {
            studentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'student_id',
            },
            tutorId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'tutor_id',
            },
            rating: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                field: 'rating',
            },
        },
        {
            tableName: 'student_rating_tutor',
            timestamps: false,
        }
    );
};

export default StudentRatingTutorModel;
