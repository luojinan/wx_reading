'use strict'

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const BookSchema = mongoose.Schema({
  author: Array,
  title: String,
  publisher: String,
  images: Array
})
const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel
