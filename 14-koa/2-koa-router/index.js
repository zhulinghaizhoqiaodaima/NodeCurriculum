import Koa from 'koa'
const app = new  Koa();
import router from './router/index.js'



app.use(router.routes()).use(router.allowedMethods())

// app.use((ctx,next)=>{
//     ctx.response.body = 'hello god'
// })
app.listen(3000)