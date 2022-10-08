
import Router from 'koa-router'
const router = new Router();

router.get('/',(ctx,next)=>{
    ctx.body = ["1111",'2222','3333',]
})

router.post('/',(ctx,next)=>{
    ctx.body = ["1111",'2222','3333',]
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

export default router;
