/**
 * Service for create, read, update and delete purchase requests.
 *
 * @author Caio Porcel
 */
class PurchaseRequestService {
    /**
     * Builds a new PurchaseRequestService.
     *
     * @param {Model} purchaseRequestModel
     * @param {ProductMovementService} productMovementService
     * @param {PurchaseService} purchaseService
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(purchaseRequestModel, productMovementService, purchaseService, paginatedSearcher) {
        this.purchaseRequestModel = purchaseRequestModel;
        this.productMovementService = productMovementService;
        this.purchaseService = purchaseService;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a purchase request by id.
     *
     * @param {number} id purchase request id.
     * @returns {Promise<Model | null>} purchase request found or null.
     */
    findById(id) {
        return this.purchaseRequestModel.findByPk(id);
    }

    /**
     * Find all purchase requests.
     *
     * @param {number} page page number.
     * @param {number} size page size.
     * @returns {Promise<PaginatedResource>} paginated purchase requests.
     */
    findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Create a purchase request.
     *
     * @param {number} userId the user id.
     * @param {number} productId the product id.
     * @param {number} depositId the deposit id.
     * @param {number} quantity the quantity of the product.
     * @returns {Promise<Model>} created purchase request.
     */
    create(userId, productId, depositId, quantity) {
        return this.productMovementService.countAvailableProducts(productId).then((available) => {
            const availableQuantity = available.map((product) => product.quantity).reduce((a, b) => a + b, 0);

            if (availableQuantity >= quantity) {
                return this._retireFromInternalDeposits(userId, productId, quantity, available);
            } else {
                return this._buyFromBestQuotation(userId, productId, depositId, quantity);
            }
        });
    }

    /**
     * Given a PurchaseRequest, retires the products from the internal deposits.
     *
     * @private
     *
     * @param {number} userId the user id.
     * @param {number} productId the product id.
     * @param {number} quantity the quantity of the product.
     * @param {Array<{depositId: number, quantity: number}>} depositData the deposit data.
     * @returns {Promise<Model>} the product movement created.
     */
    async _retireFromInternalDeposits(userId, productId, quantity, depositData) {
        const status = "APPROVED";

        let remainingQuantity = quantity;

        const mediumPrice = await this.productMovementService.calcMediumPrice(productId);

        for (let i = 0; i < depositData.length; i++) {
            const deposit = depositData[i];
            if (deposit.quantity >= remainingQuantity) {
                await this.productMovementService.create(deposit.depositId, productId, "OUT", remainingQuantity, mediumPrice, new Date());
                break;
            }

            await this.productMovementService.create(deposit.depositId, productId, "OUT", deposit.quantity, mediumPrice, new Date());
            remainingQuantity -= deposit.quantity;
        }

        return await this.purchaseRequestModel.create({
            productId,
            quantity,
            userId,
            status,
        });
    }

    /**
     * Buy a product from the best quotation.
     *
     * @private
     *
     * @param {number} userId the user id.
     * @param {number} productId the product id.
     * @param {number} depositId the deposit id.
     * @param {number} quantity the quantity of the product.
     * @returns {Promise<PurchaseRequest>} created purchase request.
     */
    async _buyFromBestQuotation(userId, productId, depositId, quantity) {
        const purchaseRequest = await this.purchaseRequestModel.create({
            productId,
            depositId,
            quantity,
            userId,
            status: "PENDING"
        });

        return this.purchaseService.buy(purchaseRequest).then((purchase) => {
            purchaseRequest.status = "APPROVED";
            purchaseRequest.save();
            return purchaseRequest;
        }).catch((error) => {
            purchaseRequest.status = "REJECTED";
            purchaseRequest.save();
            throw error;
        });
    }
}

module.exports = PurchaseRequestService;