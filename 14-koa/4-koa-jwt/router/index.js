import Router from 'koa-router'
import listRouter from './list.js'
import userRouter from './user.js'
import homeRouter from './home.js'
import loginRouter from './login.js'

const router = new Router();

// router.prefix('/api')

router.use('/user',userRouter.routes(),userRouter.allowedMethods)
router.use('/list',listRouter.routes(),listRouter.allowedMethods)
router.use('/home',homeRouter.routes(),listRouter.allowedMethods)
router.use('/login',loginRouter.routes(),listRouter.allowedMethods)

router.redirect('/','/home')

export default router;