import Router from 'koa-router'
import multer from '@koa/multer'
import JWT from '../utils/jwt.js'
import UserModel from '../model/userModel.js'
const router = new Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage })


router.get('/', async (ctx, next) => {
    ctx.body = ["1111", '2222', '3333',]
    // console.log(ctx.query);
    // console.log(ctx.querystring);
})

router.post('/', (ctx, next) => {
    ctx.body = ctx.request.body;
    // console.log(ctx.request.rawBody);  // 存放没有处理过的post数据
})

router.put('/:id', (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "add list success"
    }
})

router.delete('/:id', (ctx, next) => {
    ctx.body = {
        ok: 1,
        info: "delete list success"
    }
})

router.post('/login', (ctx, next) => {
    const data = ctx.request.body;
    const token = JWT.generate({
        username: data.username,
        password: data.password,
    }, '1d') // token返回在header中
    ctx.set('Authorization', token) // ctx.set 设置header
    ctx.body = {
        code: 1,
        ok: 1,
        data: data,
    }
})
router.post('/upload', upload.single('avatar'),async (ctx) => {
    console.log(ctx.request.body); //
    console.log(ctx.req.body);
    const {username,password,age, avatar} =ctx.request.body
    let avatar1 = avatar ?`/uploads/${avatar}` : '/images/default.png'
    UserModel.create({
        username,
        age,
        password,
        avatar:avatar1,
    })    
    //利用User模型进行数据存储操作 UserModel.create
    ctx.body = {
        code: 1,
        ok: 1,
        data: '',
    }
})
export default router;
