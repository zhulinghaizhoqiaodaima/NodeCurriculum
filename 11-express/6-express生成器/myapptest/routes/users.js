var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  res.cookie('gender','male ')
  res.send({
    name:'zhulinhai',
    age:18,

  });
});

module.exports = router;
