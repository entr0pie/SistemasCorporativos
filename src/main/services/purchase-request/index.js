const PurchaseRequestService = require('./PurchaseRequestService');
const {PurchaseRequest} = require('../../models');
const productMovementService = require('../product-movement');
const PaginatedSearcher = require('../data/paginated/PaginatedSearcher');

module.exports = new PurchaseRequestService(
    PurchaseRequest,
    productMovementService,
    new PaginatedSearcher(PurchaseRequest)
);