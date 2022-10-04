import express from 'express'
const homeRouter = express.Router()

homeRouter.get('/',(req,res)=>{
    //查询数据库
    //返回内容
    res.send({
        code:1,
        list:[1,2,3],
        name:res.zhulinhai,
        age:18,
    });
})
homeRouter.get('/list',(req,res)=>{
    //查询数据库
    //返回内容
    res.send({
        code:1,
        list:[111,222,333],
    });
})


export default homeRouter