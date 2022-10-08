import Koa from 'koa'
import koaStatic from 'koa-static'
import path from 'path'
import bodyparser from 'koa-bodyparser'
import views from 'koa-views'
import router from './router/index.js'
import session from 'koa-session-minimal'

const __dirname = path.resolve();
const app = new Koa();

// 加载模板引擎
app.use(views(`${__dirname}/views`, { // 多了一个点,kao，应该配置在router之前
    extension: 'ejs'
}))
// app.use(async (ctx) => {
//     let title = 'hello koa2'
//     await ctx.render('home', {
//         title,
//     })
// })
app.use(bodyparser());//响应获取post参数，应该配置在路由之前

app.use(session({
    key: 'zhulinhia_id',
    cookie: {
        maxAge:1000*60
    }
}))
app.use(async (ctx, next) => {
    //排除login相关的路由和接口
    if (ctx.url.includes("login")) {
        await next()
        return
    }
    if (ctx.session.user) {
        //重新设置以下sesssion
        ctx.session.mydate = Date.now()
        await next()
    } else {
        ctx.redirect("/login")
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.use(koaStatic(path.join(__dirname, 'public')))

app.listen(3000)