'use strict'

import https from 'https'

import {
  BookModel
} from '../mongoose/dbConnect'
class BookController {
  constructor() {

  }

  /**
   * 根据豆瓣api和图书isbn获取图书数据
   * @param {*} ctx
   * @param {*} next
   */
  async getBookByDouban(ctx) {
    const {
      isbn
    } = ctx.params
    try {
      if (isbn) {
        const url = `https://api.douban.com/v2/book/isbn/${isbn}?apikey=0df993c66c0c636e29ecbb5344252a4a`
        const bookInfo = await getJson(url)
        ctx.body = {
          code: 0,
          data: bookInfo
        }
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
  async addBook(ctx, next) {
    const {
      isbn
    } = ctx.request.body
    console.log('全局变量用户id' ,ctx.state.userId);
    try {
      if (isbn) {
        const url = `https://api.douban.com/v2/book/isbn/${isbn}?apikey=0df993c66c0c636e29ecbb5344252a4a`
        let bookInfo = await getJson(url)
        // console.log(BookModel);
        // ctx.body = {
        //   code: 0,
        //   data: BookModel
        // }
        // 新增数据之前查重
        const check = await BookModel.find({
          'isbn10': bookInfo.isbn10
        }, {
          'isbn13': bookInfo.isbn13
        })
        if (check.length) {
          // console.log(check);  // 是个数组。。。要用length才行
          ctx.body = {
            code: -1,
            msg: '已添加过此图书',
            data: check
          }
        } else {
          // console.log('数据库中没有此isbn')
          // 支持await了 ，不需要 (err,data).....
          bookInfo.userId = ctx.state.userId
          const data = await BookModel.create(bookInfo)
          if (data) {
            ctx.body = {
              code: 200,
              data: data
            }
          }
        }
      }
    } catch (err) {
      ctx.throw(err)
    }
  }

  /**
   * 获取我添加的所有图书
   * @param {*} ctx
   * @param {*} next
   */
  async getBook(ctx) {
    const {
      page,
      size
    } = ctx.query
    try {
      let data = await BookModel.find().limit(parseInt(size)).skip(parseInt(page * size))
      ctx.body = {
        code: 200,
        data
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
  async getBookById(ctx) {
    const {
      bookId
    } = ctx.params
    try {
      // 更新浏览次数（new参数-返回分心后的数据。否则返回的是更新前的数据）
      const data = await BookModel.findOneAndUpdate({_id: bookId}, { $inc: { viewTimes: 1 } },{ new: true })
      ctx.body = {
        code: 200,
        msg: '浏览次数+1',
        data
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
  /**
   * 获取浏览量前9的9本书数据列表，作为首页轮播图
   * @param {*} ctx
   * @param {*} next
   */
  async getTopBook(ctx) {
    try {
      // 对数据进行排序-1倒序--大到小 1正序--小到大
      const data = await BookModel.find({}).sort({'viewTimes': -1}).limit(9)
      ctx.body = {
        code: 200,
        msg: '首页排名前9',
        data
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    // node原生的https方法，get到的数据是一段一段的，需要回调end时拼接完所有数据，并转json
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookInfo = JSON.parse(urlData)
        if (bookInfo.title) {
          resolve(bookInfo)
        }
        reject(bookInfo)
      })
    })
  })
}
export default new BookController()
