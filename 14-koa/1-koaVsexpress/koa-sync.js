import Koa from 'koa'


const app = new Koa()

app.use((ctx, next) => {
    if(ctx.url ==='/favicon.ico') return;
    console.log('1111');
    next()
    console.log('3333');
    ctx.body("hello world")
})

app.use((ctx, next) => {
    console.log('222222');
})
app.listen(3001)