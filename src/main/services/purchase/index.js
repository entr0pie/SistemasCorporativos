const PurchaseService = require('./PurchaseService');
const {Purchase} = require('../../models');
const productMovementService = require('../product-movement');
const quotationService = require('../quotation');

module.exports = new PurchaseService(Purchase, quotationService, productMovementService);