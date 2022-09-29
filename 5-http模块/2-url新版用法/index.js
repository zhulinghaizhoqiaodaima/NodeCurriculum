import http from 'http'
import {URL} from 'url'
//创建服务器
http.createServer((req,res)=>{
    //接收浏览器传的参数，返回渲染的内容
    if(req.url =='/favicon.ico') return;
    // let urlObj = url.parse(req.url,true)
    // console.log(urlObj.query);
    const urlObj = new URL(req.url,'http://localhost:5000')
    console.log(urlObj.searchParams);
    res.writeHead(renderState(urlObj.pathname),{'Content-Type':'text/html'})
    res.write(renderHtml(urlObj.pathname))
    res.end()
}).listen(5000,()=>{
    console.log('server start');
})

function renderHtml(url) {
    console.log(url);
    let content = '';
    switch(url) {
        case '/home':
            content = '欢迎来到首页'
            break;
        case '/list':
            content = '欢迎来到列表页'
            break;
        default:
            content = '404 Not Found'
    }
    return (
        `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1> ${content}</h1>
        <div>大家好</div>
    </body>
    </html>
    `
    )
}

function renderState(url) {
    let arr = ['/home','/list']
    return arr.indexOf(url) !== -1 ? 200:404
}