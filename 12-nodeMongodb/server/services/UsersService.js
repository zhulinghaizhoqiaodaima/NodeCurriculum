const userModel = require('../model/userModel');
const UserService = {
    addUser:(username, password, age,res)=>{
       return userModel.create({
            username,
            password,
            age
        })
    },
    updateUser:(username, password, age, id)=>{
       return userModel.updateOne({ _id: id }, {
            username,
            password,
            age
        })
    },
    deleteUser: (id) => {
       return userModel.deleteOne({ _id:id  })

    },
    getUsers: (page, limit) => {
       return userModel.find({}, ['username', 'age']).sort({ age: 1 }).skip((page - 1) * limit).limit(limit)
    },
    loginUser:(username,password)=>{
        return userModel.find({username,password})
    }
}
module.exports = UserService