import Koa from 'koa'
const app = new  Koa();
app.use((ctx,next)=>{
    ctx.response.body = 'hello god'
})
app.listen(3000)