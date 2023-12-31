const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add-product',
    path: '/',
    editing: false
  })
}

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
  product
    .save()
    .then((result) => {
      console.log('Created Prduct')
      res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch((err) => console.log(err))
}

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.imageUrl = updatedImageUrl
      product.description = updatedDesc
      return product.save()
    })
    .then(() => {
      console.log('Edited successfully')
      res.redirect('/admin/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      })
    })
    .catch((err) => console.log(err))
}

exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT')
      res.redirect('/admin/products')
    })
    .catch((err) => console.log(err))
}