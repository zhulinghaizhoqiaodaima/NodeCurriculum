import express from 'express'


const app = express()

app.use((req, res, next) => {
    if(req.url ==='/favicon.ico') return;
    console.log('1111');
    next()
    console.log('3333');
    res.send("hello world")
})

app.use((req, res, next) => {
    console.log('222222');
})
app.listen(3001)