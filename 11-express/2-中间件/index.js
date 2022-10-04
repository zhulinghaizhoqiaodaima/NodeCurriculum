import express from 'express'
import router from './router/index.js'

const app = express()
//配置post解析中间件
app.use(express.urlencoded({extended:false})) // post参数x-www-form-urlencode -form表单格式
app.use(express.json()) // post参数- json格式配置

app.get('/',(req,res)=>{
    res.send('hhhh')
})


app.use('/',router) // 路由级别中间件

const hasToken = (req,res,next)=>{
    //验证用户token/cookie
    console.log('验证token');
    let token = Math.random() > 0.5 ? true:false;
    if(token) {
        res.zhulinhai = 'handle result'
        next()
    }else{
        res.send({
            code:400,
            msg:"token已过期"
        })
    }
}
app.use(hasToken) // 应用级别Middleware


app.get('/home',(req,res)=>{
    //查询数据库
    //返回内容
    res.send({
        code:1,
        list:[1,2,3],
        name:res.zhulinhai,
        age:18,
    });
})

app.use((req,res)=>{ //错误中间件，放到最后
    res.status(404).send('Sorry, cant find that');
}) 
app.listen(3000,()=>{
    console.log('server start');
})
