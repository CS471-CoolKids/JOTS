import { DataTypes } from 'sequelize';

/**
 * Represents a tutor's rating for a student.
 *
 * @property {number} tutorId - The ID of the tutor.
 * @property {number} studentId - The ID of the student.
 * @property {number} rating - The rating given by the tutor to the student.
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const TutorRatingStudentModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'tutor_rating_student',
        {
            tutorId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'tutor_id',
            },
            studentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'student_id',
            },
            rating: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                field: 'rating',
            },
        },
        {
            tableName: 'tutor_rating_student',
            timestamps: false,
        }
    );
};

export default TutorRatingStudentModel;
