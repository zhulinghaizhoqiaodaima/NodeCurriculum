import  crypto from 'crypto'

// const hash = crypto.createHash('md5') //md5哈希算法
const hash = crypto.createHash('sha1')//sha1算法
hash.update('hellow world')
console.log(hash.digest('hex')); // 16进制进行显示