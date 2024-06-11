const {Model, Op} = require("sequelize");
const {PaginatedSearcher, PaginatedResource} = require("../data/paginated");

/**
 * Create, read, update and delete product movement.
 *
 * @author Caio Porcel
 */
class ProductMovementService {

    /**
     * Build a new ProductMovementService.
     *
     * @param {Model} productMovementModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(productMovementModel, paginatedSearcher) {
        this.productMovementModel = productMovementModel;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Create a new product movement.
     *
     * @param {number} depositId id of the deposit.
     * @param {number} productId id of the product.
     * @param {"IN" | "OUT"} movementType type of the movement.
     * @param {number} quantity quantity of the product.
     * @param {number} unitaryPrice unitary price of the product.
     * @param {Date} date date of the movement.
     *
     * @return {Promise<Model>} created movement.
     */
    async create(depositId, productId, movementType, quantity, unitaryPrice, date) {
        return this.productMovementModel.create({
            depositId: depositId,
            productId: productId,
            movementType: movementType,
            quantity: quantity,
            unitaryPrice: unitaryPrice,
            date: date
        });
    }

    /**
     * Find a product movement by id.
     *
     * @param {number} id
     * @returns {Promise<Model | null>} product movement found.
     */
    async findById(id) {
        return this.productMovementModel.findByPk(id);
    }

    /**
     * Find all product movement.
     *
     * @param {number} page page number.
     * @param {number} size page size.
     *
     * @returns {Promise<PaginatedResource>} product movement found.
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Find all movement of a product.
     *
     * @param {number} productId
     * @param {number} page
     * @param {number} size
     *
     * @return {Promise<PaginatedResource>} product movement found.
     */
    async findByProductId(productId, page, size) {
        return this.paginatedSearcher.query({productId: productId}, page, size);
    }

    /**
     * Find all movement of a deposit.
     *
     * @param {number} depositId
     * @param {number} page
     * @param {number} size
     *
     * @return {Promise<PaginatedResource>} product movement found.
     */
    async findByDepositId(depositId, page, size) {
        return this.paginatedSearcher.query({depositId: depositId}, page, size);
    }

    /**
     * Find all movement of a product in a date interval.
     *
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {number} page
     * @param {number} size
     *
     * @return {Promise<PaginatedResource>} product movement found.
     */
    async findByDateInterval(startDate, endDate, page, size) {
        return this.paginatedSearcher.query({
            date: {
                [Op.between]: [startDate, endDate]
            }
        }, page, size);
    }

    /**
     * Count the quantity available of a product in all available deposits.
     *
     * @param {number} productId
     * @returns { Promise<{depositId: number, quantity: number}[]> } quantity available in each deposit.
     */
    async countAvailableProducts(productId) {
        const outs = await this.productMovementModel.findAll({
            where: {
                productId: productId,
                movementType: "OUT"
            }
        });

        const ins = await this.productMovementModel.findAll({
            where: {
                productId: productId,
                movementType: "IN"
            }
        });

        const depositData = [];

        for (let i = 0; i < ins.length; i++) {
            const depositId = ins[i].depositId;
            const quantity = ins[i].quantity;

            if (depositData.find(d => d.depositId === depositId)) {
                depositData.find(d => d.depositId === depositId).quantity += quantity;
                continue;
            }

            depositData.push({depositId: depositId, quantity: quantity});
        }


        for (let i = 0; i < outs.length; i++) {
            const depositId = outs[i].depositId;
            const quantity = outs[i].quantity;

            if (depositData.find(d => d.depositId === depositId)) {
                depositData.find(d => d.depositId === depositId).quantity -= quantity;
                continue;
            }

            depositData.push({depositId: depositId, quantity: -quantity});
        }

        return depositData;
    }

    /**
     * Calculate the medium price of a product.
     *
     * @param {number} productId product id
     * @returns {Promise<number>} medium price of the product.
     */
    async calcMediumPrice(productId) {
        const productMovements = await this.productMovementModel.findAll({
            where: {
                productId: productId
            }
        });

        let totalQuantity = 0;
        let totalValue = 0;

        for (let i = 0; i < productMovements.length; i++) {
            const productMovement = productMovements[i];
            totalQuantity += productMovement.quantity;
            totalValue += productMovement.quantity * productMovement.unitaryPrice;
        }

        return totalValue / totalQuantity;
    }
}

module.exports = ProductMovementService;