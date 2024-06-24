const MovementFinancialSecurityToPayService = require('./MovementFinancialSecurityToPayService');
const {MovementFinancialSecurityToPay, FinancialSecurityToPay} = require('../../../../models');
const PaginatedSearcher = require('../../../data/paginated/PaginatedSearcher');


module.exports = new MovementFinancialSecurityToPayService(MovementFinancialSecurityToPay, FinancialSecurityToPay, new PaginatedSearcher(MovementFinancialSecurityToPay));