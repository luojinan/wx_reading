'use strict'

import {
  CommentModel
} from '../mongoose/dbConnect'
class   CommentController {
  constructor () {

  }
  /**
   * 添加评论
   * @param {*} ctx
   * @param {*} next
   */
  async addComment (ctx, next) {
    let data = ctx.request.body
    data.user = ctx.state.userId
    try {
      if (data) {
        // 创建评论（要不要对userid做去重）
        const res = await CommentModel.create(data)
        if (res) {
          ctx.body = {
            code: 0,
            data: res
          }
        }
      } else {
        ctx.body = {
          code: 1,
          data: '没有传入参数'
        }
      }
    } catch (err) {
      ctx.throw(err)
    }
  }

  /**
   * 获取图书详情，并更新浏览次数
   * @param {*} ctx
   * @param {*} next
   */
  async getcommentList(ctx) {
    const {
      bookId
    } = ctx.params
    try {
      const data = await CommentModel.find({bookid: bookId})
      ctx.body = {
        code: 200,
        msg: '',
        data
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
}

export default new CommentController()
