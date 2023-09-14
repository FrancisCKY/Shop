const fs = require('fs');
const path = require('path');

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  save() {
    this.id = Math.random().toString()
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

    products.push(this);

    try {
      fs.writeFileSync(p, JSON.stringify(products));
    } catch (error) {
      console.log('Error writing file:', error);
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
};
