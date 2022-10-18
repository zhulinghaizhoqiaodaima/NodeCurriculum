const assert = require('assert')
const axios = require('axios')
const supertest = require('supertest')
const app = require('../app')
let server;
// const server = app.listen(3000);

describe('测试接口22', () => {
    before(()=>{
        server = app.listen(3000);
    })
    it('返回html代码测试片段22', async () => {
        await supertest(server).get('/')
        .expect('Content-Type',/text\/html/)
        .expect(200,'<h1>hello</h1>')
    })
    after(()=>{
        server.close()
    })
})