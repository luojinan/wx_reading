'use strict'

import {
  TestModel
} from '../mongoose/dbConnect'
class TestController {
  constructor () {

  }

  /**
   * 获取文章列表
   * @param {*} ctx
   * @param {*} next
   */
  async getTest (ctx) {
    try {
      let data = await TestModel.find()
      ctx.body = {
        code: 0,
        data: data
      }
    } catch (err) {
      ctx.throw(err)
    }
  }

  /**
   * 增加数据
   * @param {*} ctx
   * @param {*} next
   */
  async createTest (ctx, next) {
    const {text} = ctx.request.body
    try {
      if (text) {
        // 创建文章
        const data = await TestModel.create({
          content: text
        })
        if (data) {
          ctx.body = {
            code: 0,
            data: data
          }
        }
      } else {
        ctx.body = {
          code: 1,
          data: '没有传入text'
        }
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
}

export default new TestController()
