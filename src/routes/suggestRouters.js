import { Router } from 'express';
import * as suggestController from '../controllers/suggest'

import auth from '../middlewares/auth'

const router = Router();

router.use(auth);

/**
 * GET /suggest/users
 */
router.get('/users', suggestController.getSuggestMatchUser);


/**
 * GET /suggest/groups
 */
router.get('/groups', suggestController.getSuggestMatchGroup);


/**
 * GET /suggest/locations
 */
router.get('/locations', suggestController.getSuggestMatchLocation);


export default router;
