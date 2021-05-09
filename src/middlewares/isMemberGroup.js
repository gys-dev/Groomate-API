import * as groupServices from '../services/groupService'

export default async function isMemberGroup(req, res, next) {
   try {
       const groupId = req.body.groupId;
       const authUser = res.locals.authUser;

       const members = await groupServices.getMemberGroup(groupId);
       members.forEach(memberModal => {
            const memberId = memberModal.attributes.id;
            if (memberId === authUser.id ) {
                next()
                return
            }
       });

       res.status(400).json({status: "failed", message: "member not in group"})

   }  catch(error) {
       res.status(400).json({status: "failed", message: "server error"})
   }
}