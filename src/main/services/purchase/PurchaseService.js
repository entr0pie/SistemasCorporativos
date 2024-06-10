const NotEnoughQuotationsError = require('./NotEnoughQuotationsError');

/**
 * Service for creating, finding, updating and deleting purchases.
 *
 * @author Caio Porcel
 */
class PurchaseService {

    /**
     * Builds a new purchase service.
     *
     * @param {Model} purchaseModel
     * @param {QuotationService} quotationService
     * @param {ProductMovementService} productMovementService
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(purchaseModel, quotationService, productMovementService, paginatedSearcher) {
        this.purchaseModel = purchaseModel;
        this.quotationService = quotationService;
        this.productMovementService = productMovementService;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a purchase by id.
     *
     * @param {number} id purchase id.
     * @returns {Promise<Purchase>} purchase found.
     */
    async findById(id) {
        return this.purchaseModel.findByPk(id);
    }

    /**
     * Find all purchases.
     *
     * @param {number} page page number.
     * @param {number} size page size.
     * @returns {Promise<PaginatedResource>} paginated purchases.
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Buys a product based on a purchase request.
     *
     * Must be available at least three quotations for the product.
     *
     * @param {PurchaseRequest} purchaseRequest purchase request.
     * @throws {NotEnoughQuotationsError} if there are not enough quotations for the product.
     * @returns {Promise<Purchase>} created purchase.
     */
    async buy(purchaseRequest) {
        let counter = 0;
        let quotations = [];

        while (1) {
            const partialQuotations = await this.quotationService.findValidQuotationsByProduct(purchaseRequest.productId, counter, counter + 10);

            partialQuotations.items.forEach((q) => quotations.push(q));
            counter += 10;

            if (!partialQuotations.hasNextPage) {
                break;
            }
        }

        if (quotations.length < 3) {
            throw new NotEnoughQuotationsError('There are not enough quotations for this product.');
        }

        const sortedQuotations = quotations.sort((a, b) => a.price - b.price);
        const bestQuotation = sortedQuotations[0];

        const purchase = this.purchaseModel.create({
            quotationId: bestQuotation.id,
            quantity: purchaseRequest.quantity,
            unitaryPrice: bestQuotation.price,
            purchaseRequestId: purchaseRequest.id,
        });

        const movement = this.productMovementService.create(
            purchaseRequest.depositId,
            purchaseRequest.productId,
            "IN",
            purchaseRequest.quantity,
            bestQuotation.price,
            new Date()
        );

        return Promise.all([purchase, movement]).then((([p, m]) => p));
    }
}

module.exports = PurchaseService;