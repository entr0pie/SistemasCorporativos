const ProductService = require('./ProductService');
const {Product} = require('../../models');
const {PaginatedSearcher} = require("../data/paginated")

module.exports = new ProductService(Product, new PaginatedSearcher(Product));
