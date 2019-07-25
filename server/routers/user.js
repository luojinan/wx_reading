import userClass from '../controllers/userControllers'

const Router = require('koa-router')
const router = Router()

// router模块定义接口方法，路径在主路径下续写
router.get('/', (ctx, next) => {
  const result = { // 创建响应返回的数据结构
    code: 200,
    ts: '测试路径'
  }
  ctx.response.body = result // 直接把响应写进页面
})
router.post('/saveUser', userClass.saveUser) // 写入微信用户，创建id
router.delete('/delUser', userClass.delUser) // 删除用户（测试用）
router.get('/getUsers', userClass.getUsers) // 获取所有用户（测试用）

export default router
