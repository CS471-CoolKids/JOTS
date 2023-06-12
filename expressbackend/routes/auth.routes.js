import { Router } from 'express';
import { register, login} from '../controllers/auth.controller.js';
import { populateUserFromToken } from './auth.middleware.js';

const router = Router();

router.use(populateUserFromToken);

router.post('/register', register);
router.post('/login', login);

export default router;
