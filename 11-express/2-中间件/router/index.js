import express from 'express'
const router = express.Router()
router.get('home',(req,res)=>{
    res.send('home')
})

router.get('/login',(req,res)=>{
    console.log(req.query);
    res.send('<h1>login</h1>'); 
})
router.post('/login',(req,res)=>{
    console.log(req.body); // 必须配置好中间件
    res.send({
        code:1,
        state:"ok",
        data:req.body
    });
})
router.get('/logout',(req,res)=>{
    res.send('<h1>logout</h1>');
})

export default router;