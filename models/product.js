const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );

    let products = [];

    try {
      const fileContent = fs.readFileSync(p, 'utf-8');
      if (fileContent) {
        products = JSON.parse(fileContent);
      }
    } catch (error) {
      console.log('Error reading file:', error);
    }

    if (this.id) {
      const existingProductIndex = products.findIndex(
        prod => prod.id === this.id
      );
      if (existingProductIndex !== -1) {
        products[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(products), err => {
          if (err) {
            console.log(err);
          }
        });
      }
    } else {
      this.id = Math.random().toString();
      products.push(this);

      try {
        fs.writeFileSync(p, JSON.stringify(products));
      } catch (error) {
        console.log('Error writing file:', error);
      }
    }
  }


  static fetchAll(cb) {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    );
    try {
      const fileContent = fs.readFileSync(p, 'utf-8');
      cb(JSON.parse(fileContent));
    } catch (error) {
      cb([]);
      console.log('Error reading file:', error);
    }
  }

  static findByID(id, cb) {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    )
    try {
      const fileContent = fs.readFileSync(p, 'utf-8')
      const products = JSON.parse(fileContent)
      const product = products.find(p => p.id === id)
      cb(product)
    } catch (error) {
      console.log('Error reading file:', error)
    }
  }

  static deleteByID(id) {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    )
    let products = []

    try {
      const fileContent = fs.readFileSync(p, 'utf-8')
      const products = JSON.parse(fileContent)
      const productIndex = products.findIndex(prod => prod.id === id)
      if (productIndex !== -1) {
        const product = products[productIndex]
        const productPrice = product.price
        products.splice(productIndex, 1)
        fs.writeFileSync(p, JSON.stringify(products), err => {
          if (err) {
            console.log('Error writing file:', err)
            return callbackify(err)
          }
        })
        Cart.deleteProduct(id, productPrice, err => {
          if (err) {
            return callback(err)
          }
          callback(null)
        })
      }
    } catch (error) {
      console.log('Error deleting file:', error)
      callback(error)
    }
  }
};
