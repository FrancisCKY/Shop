const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const Product = require('./models/product')
const User = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  })