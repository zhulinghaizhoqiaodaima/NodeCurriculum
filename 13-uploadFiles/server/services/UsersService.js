const userModel = require('../model/userModel');
const UserService = {
    addUser:(username, password, age,filepath)=>{
       return userModel.create({
            username,
            password,
            age,
            filepath
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
       return userModel.find({}, ['username', 'age','filepath']).sort({ age: 1 }).skip((page - 1) * limit).limit(limit)
    },
    loginUser:(username,password)=>{
        return userModel.find({username,password})
    }
}
module.exports = UserService