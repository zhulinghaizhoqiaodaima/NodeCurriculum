import pkg from 'jsonwebtoken';
const { sign, verify  } = pkg;
const secret = 'zhulinhai-anydata'

//测试token的加密与验证过程
const JWT = {
    generate(value,expires){
       return sign({
            data: value
          }, secret, { expiresIn: expires });
    },
    verify(token){
       return verify(token, secret);
    }
}
export default JWT;