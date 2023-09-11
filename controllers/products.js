const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add-product',
    path: '/',
    products: true,
    activeAddProduct: true
  })
}

exports.postAddProducts = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res) => {
  const products = Product.fetchAll()
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    product: true
  })
}