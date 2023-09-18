const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const db = require('./util/database')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000)