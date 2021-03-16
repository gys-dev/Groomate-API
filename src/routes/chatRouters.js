import {Router} from 'express'

import auth from '../middlewares/auth'
import groupRequire from '../middlewares/groupRequire';
import * as chatControllers from '../controllers/chat'

const router = Router();
router.use(auth);

router.post('/', groupRequire, chatControllers.createMessageGroup)
router.get('/group', groupRequire, chatControllers.getGroupChatMessage);
router.get('/person/:id', groupRequire, chatControllers.getPersonChatMessage);

export default router;