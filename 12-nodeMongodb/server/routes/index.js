var express = require('express');
const { verify } = require('../utils/jwt');
const JWT = require('../utils/jwt');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
    res.render('index');
  }else{
    res.redirect('/login')
  }
});

const token = JWT.generate({name:'叫爸爸',age:18},4)

console.log(token);

try {
  let res = JWT.verify(token)
  console.log("🚀 ~ file: index.js ~ line 21 ~ res", res)
} catch (error) {
  console.log(error);
}

setTimeout(()=>{
  try {
    let res = JWT.verify(token)
    console.log("🚀 ~ file: index.js ~ line 21 ~ res", res)
  } catch (error) {
    console.log(error);
  }
  
},5000)

module.exports = router;
