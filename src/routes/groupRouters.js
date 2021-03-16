import {Router} from 'express'
import * as groupControllers from '../controllers/group'
import auth from '../middlewares/auth'
import groupRequire from '../middlewares/groupRequire'

const router = Router()

router.use(auth);

router.get('/me', groupRequire, groupControllers.getMyGroup);
router.post('/joinGroup', groupControllers.joinGroup);
router.post('/requestJoinGroup', groupControllers.requestJoinGroup);
router.post('/approveMember', groupRequire, groupControllers.approveMember);
router.post('/approveGroup', groupRequire, groupControllers.approveMergeGroup);
router.get('/requestJoinGroup', groupRequire, groupControllers.getRequestJoinGroup);
router.post('/mergeGroup', groupRequire, groupControllers.getMergeGroup);
router.post('/member', groupRequire, groupControllers.getMembers);
router.post('/requestMergeGroup' ,groupRequire, groupControllers.requestMergeGroup);
router.get('/requestMergeGroup' ,groupRequire, groupControllers.getMergeGroup);
router.delete('/deleteYourGroup', groupRequire, groupControllers.deleteYourGroup)
router.put('/updateYourGroup', groupRequire, groupControllers.updateYourGroup)

export default router;