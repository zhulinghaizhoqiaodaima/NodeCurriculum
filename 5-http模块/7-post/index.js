import http from 'http'
import https from 'https'
import { URL } from 'url'

http.createServer((req, res) => {
    let urlObj = new URL(req.url, 'http://localhost:5000')
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*', // 允许全部域请求数据
    })
    switch (urlObj.pathname) {
        case '/api/aaa':
            httpPost((data) => {
                res.end(data)
            })
            // res.end(`${
            //     JSON.stringify({
            //         name:'zhulinhai',
            //         age:100,
            //     })
            // }`)
            break;
        default:
            res.end('404')
    }

}).listen(5000)

function httpPost(cb) {
    let data = '';
    let payload = [
        {},
        {
            "baseParam": {
                "ypClient": 1
            }
        }
    ]
    const options = {
        hostname: 'm.xiaomiyoupin.com',
        port: '443',
        path: '/mtop/market/search/placeHolder',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }

    }
    let req = https.request(options, (res) => {
        res.on('data', (chunk) => { //监听数据分段返回
            data += chunk;
        })
        res.on('end', () => {  //所有的数据都合并到一起
            // console.log(data);
            cb(data)
        })
    })
    req.write(JSON.stringify(payload))
    req.end()
  
}