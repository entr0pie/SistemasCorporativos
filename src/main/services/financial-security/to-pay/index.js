const FinancialSecurityToPayService = require('./FinancialSecurityToPayService');
const {FinancialSecurityToPay} = require('../../../models');
const PaginatedSearcher = require('../../data/paginated/PaginatedSearcher');
const movementFinancialSecurityToPayService = require('./movement');

module.exports = new FinancialSecurityToPayService(FinancialSecurityToPay, movementFinancialSecurityToPayService, new PaginatedSearcher(FinancialSecurityToPay));