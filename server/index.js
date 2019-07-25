// import mongoose from 'mongoose'
// 调用kao实例的use方法（插入中间件-堆积木）

import routers from './routers'
import check from './middlewares/checkToken'

const Koa = require('koa') // 引入koa类，注意要大写（是个类class）
const app = new Koa() // 实例化Koa

const bodyParser = require('koa-bodyparser') // 引入post请求解析
app.use(bodyParser()) // 引入路由配置
app.use(check)

routers(app) // 传入app实例，用来在其他文件使用中间件

app.listen(9000)
console.log('app start at port 9000...')
