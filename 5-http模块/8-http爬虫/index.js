import http from 'http'
import https from 'https'
import { URL } from 'url'
import cheerio from 'cheerio'


http.createServer((req,res)=>{
    let urlObj = new URL(req.url,'http://localhost:5000')
    res.writeHead(200,{
        'Content-Type':'application/json;charset=utf-8',
        'Access-Control-Allow-Origin':'*', // 允许全部域请求数据
    })
    switch(urlObj.pathname) {
        case '/api/aaa':
            httpget((data)=>{
                res.end(spider(data))
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

function httpget(cb) {
    let data = '';
    https.get(`https://i.maoyan.com/`,(res)=>{
        res.on('data',(chunk)=>{ //监听数据分段返回
            data+= chunk;
        })
        res.on('end',()=>{  //所有的数据都合并到一起
            // console.log(data);
            cb(data)
        })
    })
}

function spider(data) {
    let $ = cheerio.load(data) // 被弃用
    let $moviewlist = $('contains')
    let movies= []
    $moviewlist.each((index,value)=>{
        movies.push({
            title:$(value).find('.title').text(),
            grade:$(value).find('.grade').text(),
            actor:$(value).find('.actor').text(),
        })
    })
   return JSON.stringify($)
   
}