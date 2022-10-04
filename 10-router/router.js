import { existsSync, readFileSync } from 'fs';
import mime from 'mime';

import path from 'path'
let data = {
    code: "OK",
    data: {}
}
function router(req, res) {
    const myURL = new URL(req.url, 'http://localhost:5000')
    let pathname = myURL.pathname;
    let searchParams = myURL.searchParams
    const paths = ['/login', '/home']
    const apiPaths = ['/api/login', '/api/home']
    const apipostPaths = ['/api/loginpost']
    const render = (data) => {
        res.writeHead(200, { "Content-Type": `application/json;charset=utf8` })
        // console.log(data);
        res.write(JSON.stringify(data))
        res.end()
    }
    if (paths.includes(pathname)) { //页面路径
        res.writeHead(200, { "Content-Type": 'text/html;charset=utf8' })
        res.write(readFileSync(`./static${pathname}.html`), 'utf-8')
        res.end()
    } else if (apiPaths.includes(pathname)) {
        res.writeHead(200, { "Content-Type": `application/json` })
        for (const [key, value] of searchParams) {
            data.data[key] = value;
        }
        render(data)
    } else if (apipostPaths.indexOf(pathname) !== -1) {
        let post = ''
        req.on('data', chunk => {
            post += chunk;
        })
        req.on('end', () => {
            if (post) {
                post = JSON.parse(post)

            } else {
                post = {
                    code: 1,
                    data: {
                        state: "没有数据"
                    }
                }
            }
            render(post)
        })
    }
    else {
        if (readStaticFile(req, res)) {
            res.end();
            return;
        }
        res.writeHead(404, { "Content-Type": 'text/html;charset=utf8' })
        res.write(readFileSync('./static/404.html'), 'utf-8')
        res.end()
    }
}

//静态资源管理
function readStaticFile(req, res) {
    const __dirname = path.resolve();
    //获取路径
    const myURL = new URL(req.url, 'http://localhost:5000')
    const pathname = path.join(__dirname, '/static', myURL.pathname)
    // console.log(_dirname,myURL.pathname);
    if(myURL.pathname === '/') return false;
    if (existsSync(pathname)) {
        res.writeHead(200, { "Content-Type": `${mime.getType(myURL.pathname.split('.')[1])};charset=utf8` })
        res.write(readFileSync(pathname))
        res.end()
        return true;
    } else {
        return false;
    }

}
export default router;