import { Router } from 'express';
import { register, login, registerManager, removeRole, addRole, deleteUser } from '../controllers/auth.controller.js';
import { authenticateToken } from './auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.use(authenticateToken());
router.put('/make-manager', registerManager);
router.put('/add-role/:userId/:role', addRole)
router.put('/remove-role/:userId/:role', removeRole);
router.delete('/delete-user/:userId', deleteUser);

export default router;
