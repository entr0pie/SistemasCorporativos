const saleService = require('../../services/sale');
const SaleController = require('./SaleController');

module.exports = new SaleController(saleService);