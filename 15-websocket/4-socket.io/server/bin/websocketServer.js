const socket = require('socket.io');
const JWT = require('../utils/jwt');
const WebSocketType = {
    Error: 0, // 出错走它
    GroupList: 1, // 群聊
    GroupChat: 2, // 群聊
    SingleChat: 3, //私聊
}
function start(Server) {
    const io = require('socket.io')(Server) // 构造函数
    io.on("connection", (socket) => {
        try {
            const payload = JWT.verify(socket.handshake?.query.token)
            // console.log(payload);
            socket.user = payload.data;
            //发送欢迎语句
            socket.emit('receive', createMessage(null, `欢迎 ${payload.data.username}来到聊天室`));
            sendAll(io)
        } catch (error) {
            console.log(error);
            socket.emit(WebSocketType.Error,error);
        }
        socket.on(WebSocketType.GroupChat, (data) => {
            
            io.sockets.emit(WebSocketType.GroupChat, createMessage(socket.user, data.data)); // 全部发送
            // socket.broadcast.emit(WebSocketType.GroupChat, createMessage(socket.user, data.data)); // 广播不给自个发送
        });
        socket.on(WebSocketType.SingleChat, (data) => {
            console.log(data);
            // socket.emit(WebSocketType.SingleChat, createMessage(socket.user, data.data,data.to));
            Array.from(io.sockets.sockets).map(item=>{
                if(item[1].user.username===data.to) {
                    item[1].emit(WebSocketType.SingleChat,createMessage(socket.user,data.data))
                }
            })

        });

        socket.on('disconnect',()=>{
            console.log('执行断开');
            sendAll(io)
        })

    });
}




function sendAll(io) {
    io.sockets.emit(WebSocketType.GroupList, createMessage(null, Array.from(io.sockets.sockets).map(item => item[1].user).filter(item=>item)));
}


function createMessage(user, info,to) {
    return {
        user,
        info,
        to,
    }
}

module.exports = start
