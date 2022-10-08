
import Router from 'koa-router'
const homerouter = new Router();

homerouter.get('/', async (ctx, next) => {
  // console.log(ctx.cookies.get('name'));
  ctx.cookies.set('location', 'dalian')
  await ctx.render('home') // 自动渲染模板
})
homerouter.get('/list', async (ctx, next) => {

  ctx.body = [
    {
      "_id": "633d81c46c37d871461f62aa",
      "username": "嘎嘎嘎",
      "password": "111",
      "age": "111"
    },
    {
      "_id": "633d84da5e9b3bdb36f24e5d",
      "username": "吼吼吼",
      "password": "111",
      "age": "111"
    },
    {
      "_id": "633d850c5e9b3bdb36f24e61",
      "username": "gggg",
      "password": "222",
      "age": "1111"
    },
    {
      "_id": "633d85645e9b3bdb36f24e6d",
      "username": "admin",
      "password": "123",
      "age": "11"
    },
    {
      "_id": "633d85915e9b3bdb36f24e70",
      "username": "aaa",
      "password": "123",
      "age": "22"
    },
    {
      "_id": "633d85a65e9b3bdb36f24e72",
      "username": "bbb",
      "password": "123",
      "age": "123"
    },
    {
      "_id": "633d86b75e9b3bdb36f24e77",
      "username": "bbb",
      "password": "123",
      "age": "123"
    },
    {
      "_id": "633d886f5e9b3bdb36f24e7c",
      "username": "3152052051236",
      "password": "gggg",
      "age": "6666"
    },
    {
      "_id": "633d8a915e9b3bdb36f24e88",
      "username": "3152052051236",
      "password": "111",
      "age": "1"
    }
  ]
  

})




export default homerouter;
