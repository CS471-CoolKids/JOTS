import { DataTypes } from 'sequelize';

/**
 * Represents a record indicating a student's desire to have a tutor for a course.
 *
 * @property {number} studentId - The ID of the student.
 * @property {number} courseId - The ID of the course.
 *
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model Model Docs}.
 */
const DesiresTutorForModel = (sequelize) => {
    // Define the model using the `sequelize` instance passed as an argument
    return sequelize.define(
        'desires_tutor_for',
        {
            studentId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'student_id',
            },
            courseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: 'course_id',
            },
        },
        {
            tableName: 'desires_tutor_for',
            timestamps: false,
        }
    );
};

export default DesiresTutorForModel;
