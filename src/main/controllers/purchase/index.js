const PurchaseController = require('./PurchaseController');
const purchaseService = require('../../services/purchase');

module.exports = new PurchaseController(purchaseService);