import http from 'http'
import https from 'https'
import { URL } from 'url'

http.createServer((req,res)=>{
    let urlObj = new URL(req.url,'http://localhost:5000')
    res.writeHead(200,{
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*', // 允许全部域请求数据
    })
    switch(urlObj.pathname) {
        case '/api/aaa':
            httpget((data)=>{ // 作为中台系统向更后端发起请求
                res.end(data)
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