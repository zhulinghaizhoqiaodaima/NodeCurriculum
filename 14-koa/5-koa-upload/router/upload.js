
import Router from 'koa-router'
const uploadRouter = new Router();

uploadRouter.get('/',async (ctx,next)=>{
   await ctx.render('upload') // 自动渲染模板
    
})


export default uploadRouter;
