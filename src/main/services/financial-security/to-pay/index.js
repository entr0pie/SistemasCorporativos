const FinancialSecurityToPayService = require('./FinancialSecurityToPayService');
const {FinancialSecurityToPay} = require('../../../models');
const PaginatedSearcher = require('../../data/paginated/PaginatedSearcher');

module.exports = new FinancialSecurityToPayService(FinancialSecurityToPay, new PaginatedSearcher(FinancialSecurityToPay));