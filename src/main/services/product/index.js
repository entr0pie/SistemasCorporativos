const ProductService = require('./ProductService');
const { Product } = require('../../models');

module.exports = new ProductService(Product);
