
import Router from 'koa-router'
const homerouter = new Router();

homerouter.get('/',async (ctx,next)=>{
    console.log(ctx.cookies.get('name'));
    ctx.cookies.set('location','dalian')
   await ctx.render('home') // 自动渲染模板
    
})


export default homerouter;
