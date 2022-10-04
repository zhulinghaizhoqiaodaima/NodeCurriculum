import express from 'express'
const router = express.Router()

router.get('/login',(req,res)=>{
    let data = {
        code:1,
        msg:"后端处理好的数据"
    }
    res.render("login",data) // 渲染模板 自动寻找views下的login.ejs
})

router.get('/login/api',(req,res)=>{
    const {username, password } =req.query
    if(username && password) {
        res.send({
            code:1,
            state:"ok",
            data:req.query
        });
    }else{
        res.send({
            code:0,
            state:"error",
            msg:"请输入用户名和密码"
        });
    }
})
router.post('/login/api',(req,res)=>{
    const {username, password } =req.body // 必须配置好中间件
    console.log(username,password);
    if(username && password) {
        // res.send({
        //     code:1,
        //     state:"ok",
        //     data:{
        //         username,
        //         password
        //     }
        // });
        res.redirect('/home')
    }else{
        // res.send({
        //     code:0,
        //     state:"error",
        //     msg:"请输入用户名和密码"
        // });
        res.render('login',{msg:'用户名与密码未输入'})
    }
})




export default router;