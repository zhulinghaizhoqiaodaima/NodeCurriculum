import http from 'http'
import { URL } from 'url'

http.createServer((req,res)=>{
    let urlObj = new URL(req.url,'http://localhost:5000')
    res.writeHead(200,{
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*', // 允许全部域请求数据
    })
    switch(urlObj.pathname) {
        case '/api/aaa':
            res.end(`${
                JSON.stringify({
                    name:'zhulinhai',
                    age:100,
                })
            }`)
            break;
        default:
            res.end('404')
    }
  
}).listen(5000)