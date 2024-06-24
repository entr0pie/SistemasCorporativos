const {Sale} = require('../../models');
const {PaginatedSearcher} = require('../data/paginated');
const invoiceGenerator = require('../finance/invoice');
const saleDetailService = require('../sale-detail');
const financialSecurityToReceiveService = require('../financial-security/to-receive');
const movementFinancialSecurityToReceiveService = require('../financial-security/to-receive/movement');
const SaleService = require('./SaleService');

module.exports = new SaleService(
    Sale,
    invoiceGenerator,
    saleDetailService,
    financialSecurityToReceiveService,
    movementFinancialSecurityToReceiveService
);