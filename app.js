// const express = require('express')
// const path = require('path')
// const app = express()
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
// const adminRoutes = require('./routes/admin')
// const shopRoutes = require('./routes/shop')
// const errorController = require('./controllers/error')
// const User = require('./models/user')

// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   User.findById("651d332e84fa474f079480f2")
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id)
//       next()
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

// app.use('/admin', adminRoutes)
// app.use(shopRoutes)

// app.use(errorController.get404)

// mongoose
//   .connect('mongodb+srv://test:jOlPcWqpUknAYuOx@cluster0.l9tmhqb.mongodb.net/')
//   .then(result => {
//     app.listen(3000)
//   })
//   .catch(err => {
//     console.log(err)
//   })