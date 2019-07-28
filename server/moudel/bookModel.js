'use strict'

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const BookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  viewTimes: {
    type: Number,
    default: 1
  },
  author: Array,
  title: String,
  publisher: String,
  price: Number,
  images: Array,
  rating: Object,
  tags: Array,
  summary: Array,
  isbn13: String,
  isbn10: String
})
const BookModel = mongoose.model('book', BookSchema)

module.exports = BookModel
