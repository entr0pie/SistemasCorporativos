const {FinancialSecurityToReceive} = require('../../../models');
const {PaginatedSearcher} = require('../../data/paginated');
const invoiceGenerator = require('../../finance/invoice');
const FinancialSecurityToReceiveService = require('./FinancialSecurityToReceiveService');

module.exports = new FinancialSecurityToReceiveService(
    FinancialSecurityToReceive,
    new PaginatedSearcher(FinancialSecurityToReceive),
    invoiceGenerator
);