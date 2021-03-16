import {Group, Message, MessageType, GroupChat, PersonChat, User} from '../models'

 export const createMessage = (messageObj) => {
    return new Message(messageObj).save(null, {method: 'insert'});
 }

 export const createGroupMessage = async (groupId, messageObje) => {
    const message = await createMessage(messageObje);
    const messageId = message.attributes.id;

    try {
        const response = await new GroupChat({  
            group: groupId,
            message: messageId,
            date_send: Date.now()
        }).save(null, {method: 'insert'});

        return response;

    } catch (error) {
        console.log(error);
        // fallback to group chat
        return new GroupChat({
            group: groupId,
            message: messageId,
        }).fetch()
    }
}
export const createPersonMessage = async (senderId, receiveId, messageObj) => {
    const message = await createMessage(messageObj);
    const messageId = message.attributes.id;
    try {
        const response = await new PersonChat({  
            id_sender: senderId,
            id_receiver: receiveId,
            message: messageId
        }).save(null, {method: 'insert'});

        return response

    } catch (error) {
        console.log(error);
        // fallback to group chat
        return new PersonChat({
            id_sender: senderId,
            id_receiver: receiveId,
            message: messageId
        }).fetch()
    }
}

export const getFullMessageGroupInfo = async (data) => {
    const groupId = data.group;
    const messageId = data.message;
    
    const groupModal = await new Group({id: groupId}).fetch();
    const messageModal = await new Message({id: messageId}).fetch();

    return {
        ...data,
        group: groupModal.attributes,
        message: messageModal.attributes,
    }
}

export const getFullMessageChatInfo = async (data) => {
    const senderId = data.id_sender;
    const receiverId = data.id_receiver;
    const messageId = data.message;

    const senderModal = await new User({id: senderId}).fetch();
    const receiverModal = await new User({id: receiverId}).fetch();
    const message = await new Message({id: messageId}).fetch()
    delete senderModal.attributes.access_token
    delete receiverModal.attributes.access_token
    return {
        ...data,
        sender: senderModal.attributes,
        receiver: receiverModal.attributes,
        message: message.attributes
    }
}


 export const getGroupMessage = async (groupId, page) => {
     // get 100 record moi nhat,
    // sap xep theo ngay gui theo thu tu tang dan
    // etc
    const oldestMessage = await new GroupChat().where('group', '=', groupId)
    .orderBy('date_send', 'DESC')
    .fetchPage({
        pageSize: 50,
        page: page
    });

    const messages = oldestMessage.map(async message => getFullMessageGroupInfo(message.attributes))

    return Promise.all(messages)
 }

export const getChatPersonMessage = async (authUserId, receiverId, page) => {
    const oldestMessage = await new PersonChat({
        id_sender: authUserId,
        id_receiver: receiverId
    })
    // .orderBy('date_send', 'DESC')
    .fetchPage({
        pageSize: 50,
        page: page
    });

    const messages = oldestMessage.map(async message => getFullMessageChatInfo(message.attributes))

    return Promise.all(messages)
}