const UserService = require('../services/UsersService');

const UserContoller = {
    addUser: async (req, res) => {
        console.log(req.body);
        const { username, password, age } = req.body;
        try {
            let data = await UserService.addUser(username, password, age, res)
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
                req.session.user = data[0];  //设置session对象
                res.send({
                    ok:1,
                })
                console.log('jjjj');
            }else{
                res.send({
                    ok:0,
                })
            }
            
        } catch (error) {
            res.send(error)
        }
    },
    logout:async (req, res)=>{
        req.session.destroy(()=>{
            res.send({ok:1})
        })
    },


}

module.exports = UserContoller;