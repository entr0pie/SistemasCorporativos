const PurchaseRequestController = require('./PurchaseRequestController');
const purchaseRequestService = require('../../services/purchase-request');
const userService = require('../../services/user');

module.exports = new PurchaseRequestController(purchaseRequestService, userService);