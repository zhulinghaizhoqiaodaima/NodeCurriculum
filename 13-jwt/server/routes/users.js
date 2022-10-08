var express = require('express');
const UserContoller = require('../controllers/UsersContoller');
const userModel = require('../model/userModel');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', UserContoller.addUser)
router.put('/update/:id', UserContoller.updateUser)
router.delete('/delete/:id', UserContoller.deleteUser)
router.get('/list',UserContoller.getUsers)

//登录接口
router.post('/login',UserContoller.login)
router.get('/logout',UserContoller.logout)


module.exports = router;
