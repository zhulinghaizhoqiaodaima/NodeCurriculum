var express = require('express');
// const userModel = require('../model/userModel');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
