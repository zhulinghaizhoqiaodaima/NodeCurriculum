import Koa from 'koa'
import koaStatic from 'koa-static'
import path from 'path'
import bodyparser from 'koa-bodyparser'
import views from 'koa-views'
import router from './router/index.js'
import JWT from './utils/jwt.js'
import './config/db.config.js'
const __dirname = path.resolve();
const app = new Koa();


// 加载模板引擎
app.use(views(`${__dirname}/views`, { // 多了一个点,kao，应该配置在router之前
    extension: 'ejs'
}))

app.use(bodyparser());//响应获取post参数，应该配置在路由之前


app.use(async (ctx, next) => {
    if (ctx.url.includes('login')) {
        await next()
        return;
    }
    //验证token
    const token = ctx.headers['authorization']?.split(' ')[1]

    if (token) {
        try {
            const payload = JWT.verify(token)
            console.log(payload);
            const newToken = JWT.generate({
                username: payload.username,
                password: payload.password,
            }, '1d') // token返回在header中
            ctx.set('Authorization', newToken) // ctx.set 设置header
            await next();
        } catch (error) {
              //401
              ctx.status = 401;
              ctx.body = {
                  errCode: -1,
                  errInfo: 'token过期',
              }
        }
      
    } else {
        await next();
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.use(koaStatic(path.join(__dirname, 'public')))

app.listen(3000)