import express from 'express'
const app = express();
app.get('/',(req,res)=>{
    res.send({
        ok:1
    })
})
app.listen(5000)