const PurchaseService = require('./PurchaseService');

/**
 * Error thrown when there are not enough quotations to make a purchase.
 *
 * @see PurchaseService
 * @author Caio Porcel
 */
class NotEnoughQuotationsError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = NotEnoughQuotationsError;