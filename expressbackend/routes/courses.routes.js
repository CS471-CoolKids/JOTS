import express from 'express';
import { getCourses, addCourseCanTutor, addCourseDesiresTutorFor, addCourse, getTutorsForCourse, getUnapprovedTutors, approveTutor, removeDesiredCourseForStudent, listDesiredCoursesForStudent, removeCanTutor, listCanTutorCoursesForTutors, assignCourseToManager } from '../controllers/courses.controller.js';
import { populateUserFromToken } from './auth.middleware.js';

const router = express.Router();

router.use(populateUserFromToken);

router.get('/', getCourses);
router.post('/desires', addCourseDesiresTutorFor);
router.delete('/desires/:userId', removeDesiredCourseForStudent);
router.get('/desires', listDesiredCoursesForStudent);
router.get('/:courseId/tutors', getTutorsForCourse);
router.post('/tutors', addCourseCanTutor);
router.delete('/tutors/:userId', removeCanTutor);
router.get('/tutors', listCanTutorCoursesForTutors);
router.post('/', addCourse);
router.get('/unapproved', getUnapprovedTutors);
router.put('/approve', approveTutor);
router.put('/manager', assignCourseToManager);

// error handler middleware
router.use((error, req, res, next) => {
    console.error(error); // log the error
    res.status(500).json({ message: 'An internal server error occured.' });
});


export default router;
