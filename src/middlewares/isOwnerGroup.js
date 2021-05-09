import * as groupServices from '../services/groupService'

export default async function isOwnerGroup(req, res, next) {
   try {
        const authUser = res.locals.authUser;
        const groupId = res.locals.groupId;

        const groupModel = await groupServices.getGroupDetail(groupId);
        const group = groupModel.attributes;

        if (group.owner === authUser.id) {
            next()
        } else {
            res.status(400).json({status: "failed", message: "user not owner group"})
        }
   }  catch(error) {
       res.status(400).json({status: "failed", message: "server error"})
   }
}