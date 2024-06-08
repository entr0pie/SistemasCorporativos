const SupplierService = require('./SupplierService');
const {Supplier} = require('../../models');
const {PaginatedSearcher} = require('../data/paginated');

module.exports = new SupplierService(Supplier, new PaginatedSearcher(Supplier));