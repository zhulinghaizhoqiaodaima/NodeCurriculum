import http from 'http'
import https from 'https'
import EventEmitter from 'events'
import { URL } from 'url'


let event = null;
http.createServer((req,res)=>{
    let urlObj = new URL(req.url,'http://localhost:5000')
    res.writeHead(200,{
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*', // 允许全部域请求数据
    })
    switch(urlObj.pathname) {
        case '/api/aaa':
            event = new EventEmitter()
            event.on('play',(data)=>{
                console.log(data);
            })
            httpget((data)=>{
                res.end(data)
                event.emit('play','触发成功')
            })
            break;
        default:
            res.end('404')
    }
  
}).listen(5000)

function httpget(cb) {
    let data = '';
    https.get(`https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E6%A1%82%E6%9E%97&ci=93&channelId=4`,(res)=>{
        res.on('data',(chunk)=>{ //监听数据分段返回
            data+= chunk;
        })
        res.on('end',()=>{  //所有的数据都合并到一起
            // console.log(data);
            cb(data)
        })
    })
}