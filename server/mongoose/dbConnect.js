import mongoose from 'mongoose'
import TestModel from '../moudel/TestModel'

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('db success')
})

module.exports = {
  TestModel
}
