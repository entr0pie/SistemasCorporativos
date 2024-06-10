const PurchaseService = require('./PurchaseService');
const {Purchase} = require('../../models');
const productMovementService = require('../product-movement');
const quotationService = require('../quotation');
const PaginatedSearcher = require('../data/paginated/PaginatedSearcher');
const invoiceGenerator = require('../finance/invoice');

module.exports = new PurchaseService(Purchase, quotationService, productMovementService, invoiceGenerator, new PaginatedSearcher(Purchase));