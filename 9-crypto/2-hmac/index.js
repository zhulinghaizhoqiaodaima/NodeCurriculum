import  crypto from 'crypto'

// const hash = crypto.createHash('md5') //md5哈希算法
// const hash = crypto.createHmac('md5','zhulinhai')
const hash = crypto.createHmac('sha256','zhulinhai')
hash.update('hellow world')
console.log(hash.digest('hex')); // 16进制进行显示