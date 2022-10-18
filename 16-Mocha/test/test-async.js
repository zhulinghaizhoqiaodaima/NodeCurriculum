const fs = require('fs')
const assert= require('assert')
const fsp = fs.promises;

describe('异步测试1', () => {
    it('异步读取文件1',async ()=>{
        let data =  await fsp.readFile('./1.txt','utf8')
        assert.strictEqual(data,'hello')

    })
});


describe('异步测试2', () => {
    it('异步读取文件2'
    ,(done)=>{
        fs.readFile('./1.txt','utf8',(err,data)=>{
            if(err){
                done(err)
            }else{
                
                assert.strictEqual(data,'hello')
                done()
            }
        })
    })
});
