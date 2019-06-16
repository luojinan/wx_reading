'use strict'

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const BookSchema = mongoose.Schema({
  author: Array,
  title: String,
  publisher: String,
  images: Array,
  isbn13: String,
  isbn10: String
})
const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel
