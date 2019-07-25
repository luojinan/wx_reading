'use strict'

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  openid: String,
  userName: String,
  avatar: String
})
const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
