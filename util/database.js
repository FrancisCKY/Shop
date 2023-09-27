const mongodb = require('mongodb')
const { get } = require('../routes/admin')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://test:jOlPcWqpUknAYuOx@cluster0.l9tmhqb.mongodb.net/')
    .then(client => {
      console.log('Connected')
      _db = client.db()
      callback()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb