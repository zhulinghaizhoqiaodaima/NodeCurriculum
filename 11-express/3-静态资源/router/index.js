import express from 'express'
const router = express.Router()

router.get('/login',(req,res)=>{
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
router.post('/login',(req,res)=>{
    const {username, password } =req.body // 必须配置好中间件
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
router.get('/logout',(req,res)=>{
    res.send('<h1>logout</h1>');
})

export default router;