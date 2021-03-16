import * as groupServices from '../services/groupService'
import {socketClient, IO} from '../index';
import {Actions} from '../socketio'
const {hashMD5} = require('../utils/genHash')

export function joinGroup(req, res, next) {
    const groupId = req.body.groupId;
    const authUser = res.locals.authUser;

    groupServices.joinGroup(authUser.id, groupId)
    .then(data => {
        const groupChannelId = hashMD5('group_' + groupId);
        const holderUser = Object.assign({}, authUser)
        delete holderUser.access_token;

        socketClient.emit(Actions.JOIN_GROUP, holderUser)
        res.json({data})

    })
    .catch(error => next(error))
}
export function getUsersJoinGroup(req, res, next) {
    const groupId = req.params.id;
    console.log(groupId);

    groupServices.getMemberGroup(groupId)
    .then(data => res.json({data}))
    .catch(err => next(err));
}

export function getMyGroup(req, res, next) {
    const authUser = res.locals.authUser;
    groupServices.groupByUser(authUser.id)
    .then(data => res.json({data}))
    .catch(err => next(err));
}

export function requestJoinGroup(req, res, next) {
    const authUser = res.locals.authUser;
    const groupId = req.body.groupId;

    groupServices.createJoinRequest(authUser.id, groupId)
    .then(async data => {

        const idGroup = data.attributes.id_group;
        const owner = await groupServices.getOwnerGroup(idGroup);
        const userId = owner.id;
        const privateChannel = hashMD5('user_private_' + userId);

        delete authUser.access_token;
        IO.to(privateChannel).emit(Actions.NEW_REQUEST_JOIN, authUser);
        res.json({data: data.attributes})
    })
    .catch(err => next(err));
}
export function getRequestJoinGroup(req, res, next) {
    const groupId = res.locals.groupId;

    groupServices.getJoinGroupRequest(groupId)
    .then(data => {
       
        res.json({data})
    })
    .catch(err => next(err));
}


export function requestMergeGroup(req, res, next) {
    const sourceId = res.locals.groupId;
    const requestGroupId = req.body.groupId;
    const channelSourceGroup = hashMD5(`group_${sourceId}`);
    const channelDesGroup = hashMD5(`group_${requestGroupId}`);

    groupServices.createMergeRequest(sourceId, requestGroupId)
    .then(data => {
        // send two actions to 2 group
        IO.to(channelDesGroup).emit(Actions.NEW_REQUEST_MERGE, data)
        res.json({data})
    })
    .catch(err => next(err));
}


export function getMergeGroup(req, res, next) {
    const sourceId = res.locals.groupId;     
    groupServices.getRequestMergeGroup(sourceId)
    .then(data => {
       
        res.json({message: "success", data: data})
    })
    .catch(err => next(err));   
}

export function getMembers(req, res, next) {
    const groupId = res.locals.groupId;     
    groupServices.getMemberGroup(groupId)
    .then(data => {
        const safeUserInfo = data.map(user => {
            delete user.attributes.access_token;
            return user.attributes;
        })
        res.json({data: safeUserInfo})
    })
    .catch(err => next(err))
}

export function approveMember(req, res, next) {
    const userId = req.body.userId;
    const groupId = res.locals.groupId;
    const action = req.body.action;
    const authUser = res.locals.authUser;

    switch (action) {
        case 'approve': {
            groupServices.approveMemberJoinGroup(2, userId, 1)
            .then(data => {
                // const safeUser = data.attributes;
                // delete safeUser.access_token;

                const privateChannel = hashMD5('user_private_' + authUser.id);
                const privateChannel2 = hashMD5('user_private_' + userId);

                // IO.to(privateChannel).emit(Actions.NEW_MESSAGE, {data: safeUser});
                IO.to(privateChannel2).emit(Actions.NEW_MESSAGE, {status: "approve", data: data});

                res.json({data: data})
            })
            .catch(error => next(error))
            break;
        }
        case 'reject': {
            groupServices.approveMemberJoinGroup(2, userId, 2)
            .then(data => {
                const privateChannel2 = hashMD5('user_private_' + userId);

                IO.to(privateChannel2).emit(Actions.NEW_MESSAGE, { status: "denied"});
                res.json({data: data})
            })
            .catch(error => next(error))
            break;
        }
        default: {
            res.status(400).json({message: "Action Not Found"})
        }
    }

}

export function approveMergeGroup(req, res, next) {
    const sourceId = res.locals.groupId;
    const {groupId, action} = req.body;
    switch(action) {
        case 'approve': {
            groupServices.approveMergeGroup(sourceId, groupId, 1)
            .then(data => {
                res.json({data})
            })
            .catch(error => next(error))

            break;
        }
        case 'reject': {
            groupServices.approveMergeGroup(sourceId, groupId, 2)
            .then(data => {
                res.json({data})
            })
            .catch(error => next(error))

            break;
        }
        default: {
            res.json({message: "action not found"})
        }
    }
}
export function deleteYourGroup(req, res, next) {
    const groupId = res.locals.groupId;
    groupServices.deleteGroup(groupId)
    .then(data => {
        res.json({data});
    })
    .catch(error => next(error));
}

export function updateYourGroup(req, res, next) {
    const groupId = res.locals.groupId;
    const body = req.body;
    const {name, description, img, members} = body

    groupServices.updateGroup({
        name,  
        description,
        img
    }, members)
    .then(data => {
        if (data) {
            res.json({data: [], message: "success", status: 1})
        }
        
    })
    .catch(error => next(error))
}

