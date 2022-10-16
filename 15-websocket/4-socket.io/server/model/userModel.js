const mongoose = require('mongoose')
const UserType = {
    username:String,
    password:String,
    age:Number,
    
}
const userModel = mongoose.model('user',new mongoose.Schema(UserType))


//模型users将会对应users集合,默认加上s
module.exports = userModel;