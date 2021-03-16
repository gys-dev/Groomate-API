import { Router } from 'express';

import * as majorControllers from '../controllers/major';
import auth from '../middlewares/auth'
const router = Router();


/**
 * GET /api/school
 */
router.get('/', majorControllers.getAllSchools);

/**
 * GET /api/school/:id
 */
router.get('/:id', majorControllers.getMajorsBySchool);

export default router;
