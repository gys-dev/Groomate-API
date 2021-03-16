import * as chatServices from '../services/chatService'
import {socketClient, IO} from '../index'
import {Actions} from '../socketio'
import { hashMD5 } from '../utils/genHash';

export const createMessageGroup = (req, res, next) => {

    const authUser = res.locals.authUser;
    const groupId = res.locals.groupId;
    const body = req.body;
    const {message, chat_type, image, receiver} = body;
    const groupChannel = res.locals.channels.group;
    console.log("emit to: " + groupChannel);

    switch (chat_type) {
        case 'group': {
            const chatBody = {
                message,
                sender_id: authUser.id,
                image
            }
            chatServices.createGroupMessage(groupId, chatBody)
            .then(async data => {
                const response = await chatServices.getFullMessageGroupInfo(data.attributes);
                
                if (socketClient) {
                    socketClient.to(groupChannel).emit(Actions.NEW_MESSAGE, response);
                }

                res.json({data: response});
            })
            .catch(error => next(error))
            break;
        }
        case 'person': {
            const chatBody = {
                message,
                sender_id: authUser.id,
                image
            }
            chatServices.createPersonMessage(authUser.id, receiver, chatBody)
            .then(async data => {
                const response = await chatServices.getFullMessageChatInfo(data.attributes);
                if (socketClient) {
                    const receiveChannel = hashMD5('user_' + receiver);
                    socketClient.join(receiveChannel);
                    socketClient.to(receiveChannel).emit(Actions.NEW_MESSAGE, response);
                    socketClient.leave(receiveChannel)
                }
                res.json({data: response});
            })
            .catch(error => next(error))

            break;
        }
        default: {
            res.json({status: "error", message: "chat_type not found!"})
        }
    }

}

export const getGroupChatMessage = (req, res, next) => {
    const groupId = res.locals.groupId;
    chatServices.getGroupMessage(groupId, 1)
    .then(data => {
        const listMessage = data.map(message => {
            return {
                ...message.message,
                date_send: message.date_send
            }
        })
        res.json({data: listMessage});
    })
    .catch(error => {
        next(error)
    })
}

export const getPersonChatMessage = (req, res, next) => {
    const authUser = res.locals.authUser;
    const chatId = req.params.id;

    chatServices.getChatPersonMessage(authUser.id, chatId, 1)
    .then(data => {
        const listMessage = data.map(message => {
            return {
                ...message.message,
            }
        })
        res.json({data: listMessage});
    })
    .catch(error => {
        next(error)
    })
}