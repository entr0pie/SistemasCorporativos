const QuotationController = require('./QuotationController');
const quotationService = require('../../services/quotation');

module.exports = new QuotationController(quotationService);