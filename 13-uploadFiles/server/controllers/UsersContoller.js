const UserService = require('../services/UsersService');
const JWT = require('../utils/jwt');

const UserContoller = {
    addUser: async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const filepath = req.file?`/uploads/${req.file.filename}` : '/images/default.png'
        const { username, password, age } = req.body;
        try {
            let data = await UserService.addUser(username, password, age,filepath)
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    },
    updateUser: async (req, res) => {
        console.log(req.body, req.params.id);
        const { username, password, age } = req.body;
        try {
            let data = await UserService.updateUser(username, password, age, req.params.id)
            res.send(data)
        } catch (error) {
            res.send(error)
        }


    },
    deleteUser: async (req, res) => {
        try {
            let data = await UserService.deleteUser(req.params.id)
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    },
    getUsers: async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await UserService.getUsers(page, limit)
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    },
    login: async (req, res)=>{
        console.log(req.body);
        const { username, password } = req.body;
        try {
            const data = await UserService.loginUser(username, password)
            if(data.length > 0) {
                const token = JWT.generate({
                    id:data[0]._id,
                    username:data[0].username
                },'1d') // token返回在header中
                res.header('Authorization',token)
                res.send({
                    ok:1,
                })
            }else{
                res.send({
                    ok:0,
                })
            }
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    },
    logout:async (req, res)=>{
    },
}

module.exports = UserContoller;