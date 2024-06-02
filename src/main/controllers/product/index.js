const ProductController = require('./ProductController');
const productService = require('../../services/product');

module.exports = new ProductController(productService);