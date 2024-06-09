const QuotationService = require('./QuotationService');
const {Quotation} = require('../../models');
const {PaginatedSearcher} = require('../data/paginated');

module.exports = new QuotationService(Quotation, new PaginatedSearcher(Quotation));