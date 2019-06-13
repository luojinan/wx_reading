'use strict'

import https from 'https'

import {
  BookModel
} from '../mongoose/dbConnect'
class BookController {
  constructor () {

  }

  /**
   * 根据豆瓣api和图书isbn获取图书数据
   * @param {*} ctx
   * @param {*} next
   */
  async getBookByDouban (ctx) {
    const {isbn} = ctx.params
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
  async addBook (ctx, next) {
    const {isbn, openid} = ctx.request.body
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
}

function getJson (url) {
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
