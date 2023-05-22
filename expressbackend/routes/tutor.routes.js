import { Router } from 'express';
const router = Router();

import { create, findAll, findOne, update, _delete } from '../controllers/tutor.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

router.use(authenticateToken)

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', _delete);

export default router;
