const products = []

exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add-product',
    path: '/',
    products: true,
    activeAddProduct: true
  })
}

exports.postAddProducts = (req, res, next) => {
  products.push({ title: req.body.title })
  res.redirect('/')
}

exports.getProducts = (req, res) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    product: true
  })
}