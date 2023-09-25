const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://test:jOlPcWqpUknAYuOx@cluster0.l9tmhqb.mongodb.net/')
    .then(client => {
      console.log('Connected')
      callback(client)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = mongoConnect