import { Router } from 'express';
import { getUserById, getUsers, updateUserPassword } from '../controllers/users.controller.js';
import { authenticateToken, checkManagerRole } from './auth.middleware.js';

const router = Router();

router.use(authenticateToken());

router.get('/:userId', getUserById);
router.get('/', checkManagerRole, getUsers);
router.put('/password', updateUserPassword);

export default router;
