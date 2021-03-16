import {Group, MemberGroup, RequestJoinGroup, User, RequestMergeGroup} from '../models'
import _ from 'lodash';

// TODO: Lay thanh vien voi list user ra

export const getSuggestGroup = async (page) =>  {
    const groups = await new Group().
    fetchPage({
        pageSize: 30,
        page: page,
    });

    const groupsWithRelate = groups.map(async row => {
        const owner = await row.owner.fetch();
        const users = await row.users.fetch();
        const rawUsers = JSON.stringify(users);
        const jsonUsers = JSON.parse(rawUsers);
        delete row.attributes.owner;
        return Object.assign(
            {
                members: jsonUsers,
                owner: owner.attributes
            },
            row.attributes
        )
        
    })
    
    return Promise.all(groupsWithRelate)

   
}

export const joinGroup = (userId, groupId) => {
    return  new MemberGroup({
        id_group: groupId,
        id_user: userId,
        date_join: new Date()
    }).save(null, {method: 'insert'})
    .then(data => {
        return new MemberGroup({id_group: groupId, id_user: userId}).fetch();
    })
    .catch(err => {
        console.log(err)
        return new MemberGroup({id_group: groupId, id_user: userId}).fetch();
    })
}

export const getMemberGroup = (groupId) => {
    return new Group({id: groupId}).users.fetch();
};

export const groupByUser = (userId) => {
    console.log(userId)
    return new MemberGroup({
        id_user: userId
    }).fetch()
    .then(memberGroup => {
        const groupId = memberGroup.attributes.id_group;
        return new Group({id: groupId}).fetch()
    })
   
}

export const createJoinRequest = (userId, groupId) => {
    return new RequestJoinGroup({
        id_group: groupId,
        id_user: userId,
        date: Date.now(),
        request_status: 0 // pending
    }).save(null, {method: 'insert'});
}

export const getOwnerGroup = (groupId) => {
    return new Group({
        id: groupId
    }).fetch().then(group => new User({id: group.attributes.owner}).fetch())
}

export const getJoinGroupRequest = (groupId) => {
    return new RequestJoinGroup({
        id_group: groupId
    }).fetchAll()
    .then((data) => {
        const listRequest = data;
        const mapRequest =  listRequest.map(async requestJoin => {
            const userId = requestJoin.attributes.id_user;
            const userData = await new User({id: userId}).fetch();
            const user = userData.attributes;

            delete user.access_token;
            delete requestJoin.attributes.id_user;
            delete requestJoin.attributes.id_group;

            return Object.assign({user}, requestJoin.attributes)
        })

        return Promise.all(mapRequest)
    })
}

export const createMergeRequest  = (sourceGroup, destiGroup) => {
    return new RequestMergeGroup({
        id_group_source: sourceGroup,
        id_group_des: destiGroup,
        date: Date.now(),
        request_status: 0 // pending
    }).save(null, {method: 'insert'})
    .then(data => {
        return new RequestMergeGroup({id_group_source: sourceGroup, id_group_des: destiGroup}).fetch();
    })
    .catch(err => {
        console.log(err)
        return new RequestMergeGroup({id_group_source: sourceGroup, id_group_des: destiGroup}).fetch();
    })
}

export const getRequestMergeGroup = (groupId) => {
    return new RequestMergeGroup().where({
        id_group_des: groupId,
    }).fetchAll()
    .then(data => {
        const requestDataPromises = data.map(async request => {
            const requestMerge = request.attributes;
            const groupSourceId = requestMerge.id_group_source;
            const groupDesId = requestMerge.id_group_des;

            const groupSource = await new Group({id: groupSourceId}).fetch();
            const groupDes = await new Group({id: groupDesId}).fetch();

            delete requestMerge.id_group_source;
            delete requestMerge.id_group_des;
            
            const requestMergeObj = Object.assign({
                group: groupSource,
            }, requestMerge)
           
            return requestMergeObj
        })

        return Promise.all(requestDataPromises);
    })
}

export const approveMemberJoinGroup = async (idGroup, idUser, joinAction) => {
    try {
        const requestJoinModal = await new RequestJoinGroup().where({
            id_group: idGroup,
            id_user: idUser
        }).save({request_status: joinAction}, {method: 'update'});

        if (requestJoinModal && joinAction === 1) {
            const memberGroup = await new MemberGroup({
                id_group: idGroup,
                id_user: idUser,
                date_join: Date.now()
            }).save(null, {method: 'insert'});

            return memberGroup.group.fetch();
        }

        return requestJoinModal;
    } catch(error) {
        throw new Error("Server Error");
        console.log(error);

    }
}

// test
export const approveMergeGroup = async (sourceId, desId, action) => {
    try {
        const requestMergeModal = await new RequestMergeGroup().where({
            id_group_source: sourceId,
            id_group_des: desId,
        }).save({request_status: action}, {method: 'update'});

        if (action === 1) {
           const usersModal = await new MemberGroup({id_group: desId}).member.fetch();
           const userIds = usersModal.map(user => user.attributes.id);
           await updateListUserJoinGroup(userIds, sourceId);

        }
        return requestMergeModal;
    } catch(error) {
        console.log(error);
        throw new Error("Server Error");
       
    }
}

export const deleteUsersOutGroup = async (groupId) => {
    return new MemberGroup().where({id_group: groupId}).destroy()
}

export const deleteListUsersOutGroup = async (users = []) => {
    return new MemberGroup().query().whereIn('id_user', users).del();
}

export const updateListUserJoinGroup = (users = [], groupId) => {
    return new MemberGroup().query().whereIn('id_user', users).update({
        id_group: groupId
    })
}

export const deleteGroup = async (groupId) => {
    try {
        await deleteUsersOutGroup(groupId);
        await new Group({id: groupId}).destroy();
        return true;
    } catch (error) {
        throw error
    }
}

export const updateGroup = async (groupId, groupInfo, members = []) => {
    try {
        const newGroupInfo = await new Group().where({id: groupId}).update(groupInfo)
        const allMemberModals = await new Group({id: groupId}).users.fetch();
        const allMemberId = allMemberModals.map(member => member.attributes.id);
        
        const usersDel = _.difference(allMemberId, members);
        await deleteListUsersOutGroup(usersDel);
        return newGroupInfo;
    } catch (error) {
        throw error;
    }
}