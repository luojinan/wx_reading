import bookClass from '../controllers/bookControllers'

const Router = require('koa-router')
const router = Router()

// router模块定义接口方法，路径在主路径下续写
router.get('/', (ctx, next) => {
  const result = { // 创建响应返回的数据结构
    code: 200,
    ts: '测试图书路径'
  }
  ctx.response.body = result // 直接把响应写进页面
})

router.get('/getBookByDouban/:isbn', bookClass.getBookByDouban) // 写入微信用户，创建id
router.post('/addBook', bookClass.addBook) // 写入微信用户，创建id
router.get('/getBook', bookClass.getBook) // 首页获取图书列表数据
router.get('/getBookById/:bookId', bookClass.getBookById) // 根据id获取图书详情数据
router.get('/getTopBook', bookClass.getTopBook) // 首页获取浏览量前9本书作为轮播图
export default router
