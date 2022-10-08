const jwt = require('jsonwebtoken')
const secret = 'zhulinhai-anydata'

//测试token的加密与验证过程

const JWT = {
    generate(value,expires){
       return jwt.sign({
            data: value
          }, secret, { expiresIn: expires });
    },
    verify(token){
       return jwt.verify(token, secret);
    }
}
module.exports = JWT;