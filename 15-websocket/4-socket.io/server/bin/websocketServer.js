const WebSocket = require("ws");
const JWT = require('../utils/jwt');
const WebSocketServer = WebSocket.WebSocketServer

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
    try {
        const query = req.url.replace('/?token', '')
        const payload = JWT.verify(query)
        ws.user = payload;
        ws.send(createMessage(WebSocketType.GroupChat, null, '欢迎来到聊天室'));
        sendAll()
    } catch (error) {
        console.log(error);
        ws.send(createMessage(WebSocketType.Error, null, 'token校验失败'));
    }

    ws.on('message', function message(data, isBinary) {
        console.log('received: %s',data); // 字符串形式输出
        const msgObj = JSON.parse(data);
        switch (msgObj.type) {
            case WebSocketType.GroupList:
                ws.send(createMessage(WebSocketType.GroupList, null, Array.from(wss.clients).map(item => item.user)))
                // console.log(Array.from(wss.clients).map(item=>item.user));
                break;
            case WebSocketType.GroupChat:
                // ws.send(createMessage(WebSocketType.GroupChat,ws.user,msgObj.data))
                wss.clients.forEach((client)=> {
                    if (client !== ws && client.readyState === WebSocket.OPEN) { //client !== ws 排除自己, client.readyState === WebSocket.OPEN 判断是否处于连接状
                        client.send(createMessage(WebSocketType.GroupChat,ws.user,msgObj.data))
                    }
                });
                break;
            case WebSocketType.SingleChat:
                wss.clients.forEach((client)=> {
                    console.log(client.user.data.username);
                    console.log(msgObj.to);
                    if (client.user.data.username == msgObj.to && client.readyState === WebSocket.OPEN) { //client !== ws 排除自己, client.readyState === WebSocket.OPEN 判断是否处于连接状
                        console.log('可以发送');
                        client.send(createMessage(WebSocketType.SingleChat,ws.user,msgObj.data))
                    }
                });
                break;
        }
    });
    ws.on('close',()=>{
        console.log(ws.user);
        wss.clients.delete(ws.user) // 有没有都行其实
        sendAll()
    })

});

const WebSocketType = {
    Error: 0, // 出错走它
    GroupList: 1, // 群聊
    GroupChat: 2, // 群聊
    SingleChat: 3, //私聊
}

function createMessage(type, user, data) {
    return JSON.stringify({
        type,
        user,
        data
    })
}

function sendAll() {
    //clients转发给其他人
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) { //client !== ws 排除自己, client.readyState === WebSocket.OPEN 判断是否处于连接状
            client.send(createMessage(WebSocketType.GroupList, null, Array.from(wss.clients).map(item => item.user)))
        }
    });


}