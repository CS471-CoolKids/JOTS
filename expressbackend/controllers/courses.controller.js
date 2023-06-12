import { db } from '../config/database.js';

// Everyone can request the list of courses
export const getCourses = async (req, res, next) => {
    try {
        const courses = await db.course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
};

// Students can add courses they desire tutoring for
export const addCourseDesiresTutorFor = async (req, res, next) => {
    const { courseId } = req.body;
    try {
        const desire = await db.desires_tutor_for.create({ studentId: req.user.id, courseId });
        res.status(201).json(desire);
    } catch (error) {
        next(error);
    }
};

// Students can remove courses they no longer desire tutoring for, or a manager can do it for them
export const removeDesiredCourseForStudent = async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.params.userId || req.user.id; // If the user ID is in the params, use it. Otherwise, use the ID from the token.

    try {
        // First, check if the user is either the student or a manager of the course
        const course = await db.course.findByPk(courseId);
        if (!course || (req.user.id !== userId && !req.user.roles.includes('manager'))) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Then proceed to remove the course from the student's desired list
        const result = await db.desires_tutor_for.destroy({ where: { studentId: userId, courseId } });
        if (result) {
            res.status(200).json({ message: 'Desired course removed successfully.' });
        } else {
            res.status(404).json({ message: 'Desired course not found for this student.' });
        }
    } catch (error) {
        next(error);
    }
};

export const listDesiredCoursesForStudent = async (req, res) => {
    const currentUser = req.user;

    if (!currentUser.roles.includes('student') && !currentUser.roles.includes('manager')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        // Assuming we have a desiredCourses model
        const desiredCourses = await desiredCoursesModel.findAll({ where: { userId: currentUser.id } });
        res.status(200).json({ desiredCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Students can get tutors available for any course
export const getTutorsForCourse = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const course = await db.course.findByPk(courseId, {
            include: {
                model: db.tutor,
                through: { where: { approved: true } }
            }
        });
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
};

// Tutors can add courses they can tutor
export const addCourseCanTutor = async (req, res, next) => {
    const { courseId, approved } = req.body;
    try {
        const canTutor = await db.can_tutor.create({ tutorId: req.user.id, courseId, approved });
        res.status(201).json(canTutor);
    } catch (error) {
        next(error);
    }
};

// Tutors can remove courses they no longer can tutor, or a manager can do it for them
export const removeCanTutor = async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.params.userId || req.user.id; // If the user ID is in the params, use it. Otherwise, use the ID from the token.

    try {
        // First, check if the user is either the tutor or a manager of the course
        const course = await db.course.findByPk(courseId);
        if (!course || (req.user.id !== userId && !req.user.roles.includes('manager'))) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Then proceed to remove the course from the tutor's list
        const result = await db.can_tutor.destroy({ where: { tutorId: userId, courseId } });
        if (result) {
            res.status(200).json({ message: 'Tutoring course removed successfully.' });
        } else {
            res.status(404).json({ message: 'Tutoring course not found for this tutor.' });
        }
    } catch (error) {
        next(error);
    }
};

export const listCanTutorCoursesForTutors = async (req, res) => {
    const currentUser = req.user;

    if (!currentUser.roles.includes('tutor')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        // Assuming we have a canTutorCourses model
        const canTutorCourses = await canTutorCoursesModel.findAll({ where: { userId: currentUser.id } });
        res.status(200).json({ canTutorCourses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Managers can add courses to the courses table
export const addCourse = async (req, res, next) => {
    const { id, name } = req.body;
    if (!req.user.roles.includes('manager')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    try {
        const course = await db.course.create({ id, name, managerId: req.user.id });
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};


// Managers can search for tutors who are not approved
export const getUnapprovedTutors = async (req, res, next) => {
    try {
        const unapproved = await db.can_tutor.findAll({
            where: { approved: false },
            include: db.tutor
        });
        res.status(200).json(unapproved);
    } catch (error) {
        next(error);
    }
};

// Managers can approve a tutor for a course they manage
export const approveTutor = async (req, res, next) => {
    const { tutorId, courseId } = req.body;
    if (!req.user.roles.includes('manager')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    try {
        const course = await db.course.findOne({ where: { id: courseId } });
        if (!course || course.managerId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized. You do not manage this course.' });
        }
        const record = await db.can_tutor.findOne({ where: { tutorId, courseId } });
        if (record) {
            record.approved = true;
            await record.save();
            res.status(200).json(record);
        } else {
            res.status(404).json({ message: 'Tutor/course record not found' });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Assign course to a manager
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {function} next - Next middleware function
 */
export const assignCourseToManager = async (req, res, next) => {
    const { courseId, managerId } = req.body;

    try {
        // Verify that the authenticated user is a manager
        if (!req.user.roles.includes('manager')) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Verify that the course exists
        const course = await db.course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Verify that the manager exists
        const manager = await db.manager.findByPk(managerId);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        // Assign the course to the manager
        course.managerId = managerId;
        await course.save();

        res.status(200).json({ message: 'Course assigned to manager successfully.' });
    } catch (error) {
        next(error);
    }
};



