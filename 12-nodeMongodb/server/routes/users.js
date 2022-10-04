var express = require('express');
const userModel = require('../model/userModel');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user/add',(req,res)=>{
  console.log(req.body);
  const {username,password,age} = req.body;
  userModel.create({
    username,
    password,
    age
  }).then(data=>{
    console.log('success');
    console.log(data);
    res.send(data)
  }).catch(err=>{
    console.log('fail'+err);
  })
  

})
router.post('/user/update/:id',(req,res)=>{
  console.log(req.body,req.params.id);
  const {username,password,age} = req.body;
  userModel.updateOne({_id:req.params.id},{
    username,
    password,
    age
  }).then(data=>{
    console.log('success');
    res.send(data)
  }).catch(err=>{
    console.log('fail'+err);
  })

})

router.get('/user/delete/:id',(req,res)=>{
  userModel.deleteOne({_id:req.params.id}).then(data=>{
    res.send(data)
  }).catch(err=>{
      res.send(err)
  })

})

router.get('/user/list',(req,res)=>{
  const {page,limit} = req.query;
  userModel.find({},['username','age']).sort({age:1}).skip((page-1)*limit).limit(limit).then(data=>{
    res.send(data)
  }).catch(err=>{
      res.send(err)
  })
  
})

module.exports = router;
