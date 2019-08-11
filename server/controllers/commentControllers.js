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
   * 根据图书ID获取 该图书的所有评论列表
   * @param {*} ctx
   * @param {*} next
   */
  async getcommentList(ctx) {
    const {
      bookId
    } = ctx.params
    try {
      const data = await CommentModel.find({book: bookId}).populate({ path: 'user' })
      ctx.body = {
        code: 200,
        msg: '',
        data
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
  /**
   * 根据用户ID获取该用户的所有评论列表
   * @param {*} ctx
   * @param {*} next
   */
  async getcommentListByUser(ctx) {
    const {
      userid
    } = ctx.params
    try {
      const data = await CommentModel.find({user: userid}).populate({ path: 'book' })
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
