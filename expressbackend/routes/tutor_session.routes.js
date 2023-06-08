import { Router } from 'express';
const router = Router();

import { param } from 'express-validator';

import { create, findSessions, update, _delete } from '../controllers/tutor_session.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

// TODO assess proper authentication level for each route
router.use(authenticateToken())

const checkStartTime = () => param('startTime').isDate().withMessage("startTime should be in the ISO 8601 date and time format YYYY-MM-DDTHH:mm:ss.sssZ").bail()

router.post('/', create);
router.get('/', findSessions);
router.put('/tutor/:tutorId/student/:studentId/start/:startTime', [
    checkStartTime()
], update);
router.delete('/tutor/:tutorId/student/:studentId/start/:startTime', [
    checkStartTime()
], _delete);

export default router;
