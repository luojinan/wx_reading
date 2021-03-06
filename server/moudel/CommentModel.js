'use strict'

/**
 * 标签模型
 */

import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  comment: String,
  bookid: String,
  phoneSys: String,
  location: String
})
const CommentModel = mongoose.model('comment', CommentSchema)

module.exports = CommentModel
