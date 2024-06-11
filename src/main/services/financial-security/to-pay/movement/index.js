const MovementFinancialSecurityToPayService = require('./MovementFinancialSecurityToPayService');
const {MovementFinancialSecurityToPay} = require('../../../../models');
const PaginatedSearcher = require('../../../data/paginated/PaginatedSearcher');

module.exports = new MovementFinancialSecurityToPayService(MovementFinancialSecurityToPay, new PaginatedSearcher(MovementFinancialSecurityToPay));