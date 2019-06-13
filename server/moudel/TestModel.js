'use strict'

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const TestSchema = mongoose.Schema({
  content: String // 文本
})
const TestModel = mongoose.model('test', TestSchema)

module.exports = TestModel
