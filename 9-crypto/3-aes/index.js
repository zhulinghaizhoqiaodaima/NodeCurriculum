import crypto from 'crypto'
//AES对称算法
function encrypt(key,iv,data){
    let dep = crypto.createCipheriv('aes-128-cbc',key, iv)
    return dep.update(data,'binary','hex')+ dep.final('hex') // hex结束
}
 
function decrypt(key,iv,crypted){
    crypted = Buffer.from(crypted,'hex').toString('binary')
    let dep = crypto.createDecipheriv('aes-128-cbc',key,iv)
    return dep.update(crypted,'binary','utf-8')+dep.final('utf-8') // utf-8结束
}

let key = 'abcdef1234567890'
let iv = 'tbcdey1234567890'
let data = 'zhulinhai-aaaa-竹林海'
let cryted = encrypt(key,iv,data)
console.log('加密结果:',cryted);

let res =decrypt(key,iv,cryted)
console.log('解密结果:',res);
