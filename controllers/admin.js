const Product = require('../models/product')
const fs = require('fs')
const path = require('path');

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
  const product = new Product(null, title, imageUrl, price, description)
  product.save()
  res.redirect('/')
}

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findByID(prodId, product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })
}

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProdcut = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc
  )
  updatedProdcut.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}

exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.body.productId

  const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
  )

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log('Error reading file:', err)
      return res.redirect('/')
    }

    let products = []

    if (fileContent) {
      products = JSON.parse(fileContent)
    }

    const productIndex = products.findIndex(prod => prod.id === prodId)

    if (productIndex !== -1) {
      products.splice(productIndex, 1)

      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log('Error writing file:', err)
        }
      })
    }
    res.redirect('/admin/products')
  })
}