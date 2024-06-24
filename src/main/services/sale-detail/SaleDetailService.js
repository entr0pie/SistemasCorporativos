/**
 * Sale details service.
 *
 * @author Caio Porcel
 */
class SaleDetailService {

    /**
     * Builds a new SaleDetailService
     * @param {SaleDetail} model
     * @param {ProductMovementService} productMovementService
     */
    constructor(model, productMovementService) {
        this.model = model;
        this.productMovementService = productMovementService;
    }

    /**
     * Find a SaleDetail by id
     *
     * @param {number} id
     * @returns {Promise<SaleDetail | null>}
     */
    findById(id) {
        return this.model.findById(id);
    }

    /**
     * Find by sale id.
     *
     * @param {number} saleId
     * @returns {Promise<SaleDetail[]>}
     */
    findBySaleId(saleId) {
        return this.model.find({
            where: {
                saleId: saleId
            }
        });
    }

    /**
     * Process a group of details, saving in the database.
     *
     * @param {{ saleId: number, productId: number, quantity: number, unitaryPrice: number}[]} details group of details to process.
     * @throws {Error} if the processing failed and cannot continue.
     */
    async processGroup(details) {

        const processedDetails = [];

        for (let i = 0; i < details.length; i++) {
            const detail = await this._processDetail(details[i]);
            processedDetails.push(detail);
        }

        for (let i = 0; i < processedDetails.length; i++) {
            await this.model.create(processedDetails[i]);
        }

        return processedDetails;

    }

    /**
     * Process a single detail.
     *
     * @param {{ saleId: number, productId: number, quantity: number, unitaryPrice: number}} detail
     * @private
     * @return detail processed.
     */
    async _processDetail(detail) {
        const depositData = await this.productMovementService.countAvailableProducts(detail.productId);
        let remainingQuantity = depositData.map(s => s.quantity).reduce((a, b) => a + b, 0);

        if (remainingQuantity < detail.quantity) {
            throw new Error('Not enough stock for product ' + detail.productId);
        }

        for (let i = 0; i < depositData.length; i++) {
            const deposit = depositData[i];
            if (deposit.quantity >= remainingQuantity) {
                await this.productMovementService.create(deposit.depositId, detail.productId, "OUT", remainingQuantity, detail.quantity, new Date());
                break;
            }

            await this.productMovementService.create(deposit.depositId, productId, "OUT", deposit.quantity, detail.quantity, new Date());
            remainingQuantity -= deposit.quantity;
        }

        return detail;
    }

}

module.exports = SaleDetailService;