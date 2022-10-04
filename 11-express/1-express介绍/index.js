import express from 'express'

const app = express()
app.get('/',(req,res)=>{
    res.send('hhhh')
})
app.get('/login',(req,res)=>{
    res.send('<h1>login</h1>');
})

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
app.use(hasToken)
const lastfun = (req,res)=>{
    //查询数据库
    //返回内容
    res.send({
        code:1,
        list:[1,2,3],
        name:res.zhulinhai,
        age:18,
    });
}

app.get('/home',[lastfun])

app.get('/html',(req,res)=>{
    res.send('<h1>some html</h1>');
})
app.get('/json',(req,res)=>{
    res.send({
        name:'zhulinhai',
        age:18,
    });
})



//可选路由 ? 代表b可以有也可以没有 正则 0 1
// app.get('/ab?c?d',(req,res)=>{
//     res.send('ok,options')
// })

// +代表可以有1个至多个c
// app.get('/abc+d',(req,res)=>{
//     res.send('ok,options')
// })

// *代表可以有c和d之间1个至多个字符
// app.get('/abc*d',(req,res)=>{
//     res.send('ok,options')
// })
// 匹配任何路径中含有 a 的路径：
// app.get(/a/, function(req, res) {
//     res.send('/a/');
//   });
  
// // 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
//   app.get(/.*fly$/, function(req, res) {
//     res.send('/.*fly$/');
//   });


// //占位路由
// app.get('/test/:id',(req,res)=>{
//     res.send('ok,test')
// })


app.get('/*',(req,res)=>{
    res.status(404).send('Sorry, cant find that');
})

app.listen(3000,()=>{
    console.log('server start');
})
