import { Router } from 'express';
import { getUserById, getUsers, updateUser, deleteUser } from '../controllers/users.controller.js';
import { populateUserFromToken } from './auth.middleware.js';

const router = Router();

router.use(populateUserFromToken);

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);

export default router;
