import commentClass from '../controllers/commentControllers'

const Router = require('koa-router')
const router = Router()

// router模块定义接口方法，路径在主路径下续写
router.get('/', (ctx, next) => {
  const result = { // 创建响应返回的数据结构
    code: 200,
    ts: '测试评论路径'
  }
  ctx.response.body = result // 直接把响应写进页面
})

router.post('/addComment', commentClass.addComment) // 写入微信用户，创建id
router.get('/getcommentList/:bookId', commentClass.getcommentList) // 根据id获取图书详情数据
export default router
