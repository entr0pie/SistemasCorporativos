const {Sale} = require('../../models');
const {PaginatedSearcher} = require('../data/paginated');
const invoiceGenerator = require('../finance/invoice');
const saleDetailService = require('../sale-detail');
const SaleService = require('./SaleService');

module.exports = new SaleService(Sale, invoiceGenerator, saleDetailService);
