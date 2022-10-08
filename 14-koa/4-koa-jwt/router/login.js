
import Router from 'koa-router'
const loginRouter = new Router();

loginRouter.get('/',async (ctx,next)=>{
   await ctx.render('login') // 自动渲染模板
    
})


export default loginRouter;
