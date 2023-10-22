const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("6534d13d732042a42d33e5e7")
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => {
      console.log(err)
    })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect('mongodb+srv://francis:mongo123@cluster0.l9tmhqb.mongodb.net/shop?retryWrites=true')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Peter",
          email: "132@gmail.com",
          cart: {
            items: []
          }
        })
        user.save()
      }
    })
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })