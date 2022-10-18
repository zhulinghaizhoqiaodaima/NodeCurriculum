import http from 'http'
import { URL } from 'url'

http.createServer((req,res)=>{
    let urlObj = new URL(req.url,'http://localhost:5000')
    switch(urlObj.pathname) {
        case '/api/aaa':
            res.end(`${urlObj.searchParams.get('callback')} (${
                JSON.stringify({
                    name:'zhulinhai',
                    age:100,
                })
            })`) //后端返回
            break;
        default:
            res.end('404')
    }
  
}).listen(5000)