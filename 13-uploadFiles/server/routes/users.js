var express = require('express');
const UserContoller = require('../controllers/UsersContoller');
const userModel = require('../model/userModel');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.png')
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', upload.single('avatar'), UserContoller.addUser)

router.put('/update/:id', UserContoller.updateUser)
router.delete('/delete/:id', UserContoller.deleteUser)
router.get('/list',UserContoller.getUsers)

//登录接口
router.post('/login',UserContoller.login)
router.get('/logout',UserContoller.logout)


module.exports = router;
