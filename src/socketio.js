import sockioJwt from 'socketio-jwt';
import jwt from 'jsonwebtoken'
import logger, { logStream } from './utils/logger';
import './env';
import { hashMD5 } from './utils/genHash';

const JWT_PRI_KEY = process.env.APP_JWT_PRIVATE_KEY;

export default function(http, onSuccess) {
    let io = require('socket.io')(http);

    io.use(sockioJwt.authorize({
        secret: JWT_PRI_KEY,
        handshake: true
    }));
    const token = jwt.sign({username: 'tranducy'}, JWT_PRI_KEY);
    
    io
    .on('connection', (socket) => {
       const jwtToken = socket.handshake?.query?.token;
       const userData = jwt.verify(jwtToken, JWT_PRI_KEY);
       
       const isHaveGroup = userData.groupId ? true : false;
       const groupId = isHaveGroup && userData.groupId;
       const privateChannel = hashMD5("user_private_" + userData.id);
       const userChannel = hashMD5("user_" + userData.id);

       console.log(groupId)
        // JOIN CHANNEL RỒI EMIT TƯƠNG ỨNG
       socket.join(privateChannel);
       socket.join(userChannel);
       socket.join(groupId);

       io.to(privateChannel).emit('message', 'Joined nofitication')
       socket.on('onmessage', (message) => {    
            logger.info(message)
       })

    
        onSuccess(socket);
    })
    .on('authenticated', (socket) => {

        console.log(`hello! authenticated`);
    });

    return io;
}

export const Actions = {
    JOIN_GROUP: 'JoinGroup',
    NEW_REQUEST_JOIN: 'NewRequestJoin',
    NEW_REQUEST_MERGE: 'NewRequestMerge',
    NEW_MESSAGE: "NewMessage",
    NEW_MEMBER: "NewMember",
    MERGE_GROUP: "MergeGroup"
}