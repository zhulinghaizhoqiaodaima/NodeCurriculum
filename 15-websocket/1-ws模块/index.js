const express = require('express')
const  WebSocket = require("ws")
const WebSocketServer = WebSocket.WebSocketServer

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        // console.log('received: %s',data); // 字符串形式输出
        //clients转发给其他人
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) { //client !== ws 排除自己, client.readyState === WebSocket.OPEN 判断是否处于连接状
                client.send(data, { binary: isBinary });
            }
        });

    });

    ws.send('欢迎加入聊天室');
});

const app = express();
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send({
        ok: 1
    })
})


app.listen(5000)