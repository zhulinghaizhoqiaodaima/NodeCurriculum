
import Router from 'koa-router'
const router = new Router();

router.get('/',async (ctx,next)=>{
    ctx.body = ["1111",'2222','3333',]
    console.log(ctx.query);
    console.log(ctx.querystring);
})

router.post('/',(ctx,next)=>{
    //本身监听没有问题
    // let postData="";                    // 用于存储post的数据
    // ctx.req.on('data',function(data){
    //     postData+=data;                     // 将数据拼接起来
   	// })
    // ctx.req.on('end',function(){
    //     console.log(JSON.parse(postData));          // 获取数据
    //     ctx.res.end('')
    // })
    // ctx.body = {
    //     ...postData
    // }
    ctx.body=ctx.request.body; 
    console.log(ctx.body);        // post的参数存在ctx.request.body中
    // console.log(ctx.request.rawBody);  // 存放没有处理过的post数据
})

router.put('/:id',(ctx,next)=>{
    ctx.body = {
        ok:1,
        info:"add list success"
    }
})

router.delete('/:id',(ctx,next)=>{
    ctx.body = {
        ok:1,
        info:"delete list success"
    }
})

router.post('/login',(ctx,next)=>{
    ctx.body={
        code:1,
        ok:1,
        data:ctx.request.body
    }
    ctx.session.user = {
        username:'zhulinhai'
    } //登录后设置session
    console.log(ctx.body);        // post的参数存在ctx.request.body中
})

export default router;
