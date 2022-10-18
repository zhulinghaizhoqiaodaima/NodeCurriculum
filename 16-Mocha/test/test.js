const sum = require('../sum')
const assert = require('assert')

//不建议全局安装mocha

describe('大的组1测试', () => {
    describe('小的组1测试', () => {
        it("sum() ->0",()=>{
            assert.strictEqual(sum(),0)
        })
    });
    describe('小的组2测试', () => {
        it("sum() ->1",()=>{
            assert.strictEqual(sum(1),1)
        })
        
    });
    
});
describe('大的组2测试', () => {
    describe('小的组1测试', () => {
        it("sum() ->3",()=>{
            assert.strictEqual(sum(1,2),3)
        })
    });
    describe('小的组2测试', () => {
        it("sum() ->6",()=>{
            assert.strictEqual(sum(1,2,3),6)
        })
        
    });
    
});