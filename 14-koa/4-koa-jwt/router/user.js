import Router from 'koa-router'

import JWT from '../utils/jwt.js'
const router = new Router();
router.get('/',async (ctx,next)=>{
    ctx.body = ["1111",'2222','3333',]
    // console.log(ctx.query);
    // console.log(ctx.querystring);
})

router.post('/',(ctx,next)=>{
    ctx.body=ctx.request.body; 
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
    const data = ctx.request.body;
    const token = JWT.generate({
        username:data.username,
        password:data.password,
    },'10s') // token返回在header中
    ctx.set('Authorization',token) // ctx.set 设置header
    ctx.body={
        code:1,
        ok:1,
        data:data,
    }
})

export default router;
