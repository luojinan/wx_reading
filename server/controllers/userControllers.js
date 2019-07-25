'use strict'

import {Axios} from '../api/axios'
import {UserModel} from '../mongoose/dbConnect'
import jwt from 'jsonwebtoken'
class UserController {
  constructor() {

  }

  /**
   * 获取当前用户信息或插入用户信息
   * @param {*} ctx
   * @param {*} next
   */
  async saveUser(ctx) {
    console.log('调用saveUser处理方法');
    const {jsCode, userName, avatar} = ctx.request.body
    const BASE_URL = 'https://api.weixin.qq.com/'
    const config = {
      appId: 'wx738677e14450d7ba',
      appSecret: '46a2a8dff288c6625149b3676295ed3f',
    }
    try {
      if (jsCode) {
        const url = `${BASE_URL}sns/jscode2session?appid=${config.appId }&secret=${config.appSecret}&js_code=${jsCode}&grant_type=authorization_code`
        const res = await Axios(url).catch(err => console.log(err, '请求失败'))
        // res获取到session_key、openid，根据openid查找数据库user表并插入或更新
        const check = await UserModel.find({'openid': res.openid})
        if (check.length) {
          // console.log(check);  // 是个数组。。。要用length才行，数组有值代表数据库已有数据
          let data = {
            userName: check[0].userName,
            avatar: check[0].avatar,
            _id: check[0]._id,
            time: new Date().getTime(),
            timeout: 1000*60*60*2
          }
          let token = jwt.sign(data, 'secret')
          ctx.body = {
            code: 200,
            msg: '当前账号已存在',
            data,
            token
          }
        } else {
          const userInfo = {
            openid: res.openid,
            userName: userName,
            avatar: avatar
          }
          const data = await UserModel.create(userInfo)
          let tokenData = {
            userName: data.userName,
            avatar: data.avatar,
            _id: data._id,
            time: new Date().getTime(),
            timeout: 1000*60*60*2
          }
          let token = jwt.sign(tokenData, 'secret')
          if (data) {
            ctx.body = {
              code: 200,
              data: data,
              token
            }
          }
        }
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
  /**
   * 删除用户（仅仅用于测试）
   * @param {*} ctx
   * @param {*} next
   */
  async delUser(ctx) {
    const {openid} = ctx.request.body
    try {
      const data = {openid} 
      const res = await UserModel.deleteOne(data).catch(err => console.log(`删除用户失败${err}`))        
      console.log(res, '删除api返回结果')
      const findAll = await UserModel.find()  // 是个数组
      ctx.body = {
        code: 200,
        msg: '删除用户测试接口，返回表中剩余所有用户',
        data: findAll
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
  /**
   * 查看用户表（仅仅用于测试）
   * @param {*} ctx
   * @param {*} next
   */
  async getUsers(ctx) {
    try {
      const findAll = await UserModel.find()  // 是个数组
      ctx.body = {
        code: 200,
        msg: '查看用户表中已有的所有用户',
        data: findAll
      }
    } catch (err) {
      ctx.throw(err)
    }
  }
}

export default new UserController()
