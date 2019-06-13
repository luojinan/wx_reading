/**
 * koa服务器路由
 *  配置路径，音容控制方法（响应、调数据库）
 */

import test from './test'
import user from './user'
import book from './book'

const Router = require('koa-router')
const router = new Router()

// router模块用于配置路由路径，这是个根路径，不是具体的接口路径
export default (app) => {
  router.use('/test', test.routes()) // router.use配置路由根路径

  router.use('/user', user.routes()) // 用户接口
  router.use('/book', book.routes()) // 图书接口

  app.use(router.routes()) // app.use注册中间件，不写在server index里
}
