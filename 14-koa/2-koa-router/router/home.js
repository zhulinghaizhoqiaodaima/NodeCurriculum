
import Router from 'koa-router'
const homerouter = new Router();

homerouter.get('/',(ctx,next)=>{
    ctx.body = `
        <html>
            <h1>home页面</h1>
        </html>
    `
})


export default homerouter;
