import Koa from 'koa'


const app = new Koa()

app.use(async (ctx, next) => {
    if(ctx.url ==='/favicon.ico') return;
    console.log('1111');
    await next() //koa这里会等待异步
    console.log('4444',ctx.token)
    ctx.body = "hello world"
    
})

app.use(async (ctx, next) => { // 这里异步
    console.log('2222');
    //异步
    await delay(2000)
    ctx.token = 'sdnjkklanmlscmdkd'
    console.log('3333');
})

function delay(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1)
        },time)
    })
}

app.listen(3001)