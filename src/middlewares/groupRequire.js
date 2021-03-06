const Boom = require("@hapi/boom");
const {hashMD5} = require('../utils/genHash')
const groupServices = require('../services/groupService')

export default async function (req, res, next) {
    try {
         const authUser = res.locals.authUser;
         const group = await groupServices.groupByUser(authUser.id);
         if (group) {
            res.locals.channels.group = hashMD5('group_' + group.id);
            res.locals.groupId = group.id;
            
            next();
            return
         }
        throw new Error("User not join any group");
    } catch(error) {

        return res.json({status: "error", message: error.message});
    }
}