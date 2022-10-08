import express from 'express'


const app = express()

app.use(async (req, res, next) => {
    if(req.url ==='/favicon.ico') return;
    console.log('1111');
    next() //这里不会等待异步
    console.log('2222');
    res.send("hello world")
})

app.use(async (req, res, next) => { // 这里异步
    console.log('3333');
    //异步
    await delay(2000)
    console.log('4444');
})

function delay(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1)
        },time)
    })
}

app.listen(3001)