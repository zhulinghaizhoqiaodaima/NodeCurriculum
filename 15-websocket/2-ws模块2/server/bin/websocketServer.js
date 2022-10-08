const  WebSocket = require("ws");
const JWT = require("../utils/jwt");
const WebSocketServer = WebSocket.WebSocketServer

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,req) {
    try {
        const query = req.url.replace('/?token','')
        const payload = JWT.verify(query)
        ws.send(createMessage(WebSocketType.GroupChat,null,'欢迎来到聊天室'));
    } catch (error) {
        // ws.send('token校验失败')
        ws.send(createMessage(WebSocketType.Error,null,'token校验失败'));
    }

    ws.on('message', function message(data, isBinary) {
        // console.log('received: %s',data); // 字符串形式输出
        //clients转发给其他人
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) { //client !== ws 排除自己, client.readyState === WebSocket.OPEN 判断是否处于连接状
                client.send(data, { binary: isBinary });
            }
        });

    });

  
});

const WebSocketType = {
    Error:0, // 出错走它
    GroupList:1, // 群聊
    GroupChat:2, // 群聊
    SingleChat:3, //私聊
}

function createMessage(type,user,data) {
    return JSON.stringify({
        type,
        user,
        data
    })
}