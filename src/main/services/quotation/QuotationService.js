const {Op} = require("sequelize");

/**
 * Service for create, read, update and delete quotations.
 *
 * @author Caio Porcel
 */
class QuotationService {

    /**
     * Builds a new QuotationService.
     *
     * @param {Model} quotationModel
     * @param {PaginatedSearcher} searcher
     */
    constructor(quotationModel, searcher) {
        this.quotationModel = quotationModel;
        this.searcher = searcher;
    }

    /**
     * Create a new Quotation.
     *
     * @param {number} productId product id.
     * @param {number} supplierId supplier id.
     * @param {number} price unitary price of the product.
     * @param {Date} date quotation date.
     * @param {number} costCenterId cost center id.
     * @param {Date} expirationDate quotation expiration date.
     * @return {Promise<Model>} created quotation.
     */
    async create(productId, supplierId, price, date, costCenterId, expirationDate) {
        return this.quotationModel.create({
            productId,
            supplierId,
            price,
            date,
            costCenterId,
            expirationDate,
        });
    }

    /**
     * Find quotations by product id.
     *
     * @param productId product id.
     * @param page page number.
     * @param size page size.
     * @returns {Promise<PaginatedResource>} paginated quotations.
     */
    async findValidQuotationsByProduct(productId, page, size) {
        return this.searcher.query({
            productId,
            expirationDate: {
                [Op.gt]: new Date()
            }
        }, page, size);
    }

    /**
     * Find a quotation by id.
     *
     * @param {number} id quotation id.
     * @returns {Promise<Model | null>} quotation found or null.
     */
    async findById(id) {
        return this.quotationModel.findByPk(id);
    }

    /**
     * Find all quotations (paginated).
     *
     * @param {number} page page number.
     * @param {number} size page size.
     * @returns {Promise<PaginatedResource>} paginated quotations.
     */
    async findAll(page, size) {
        return this.searcher.search(page, size);
    }

    /**
     * Update a quotation.
     *
     * @param {number} id quotation id.
     * @param {number} productId product id.
     * @param {number} supplierId supplier id.
     * @param {number} price unitary price of the product.
     * @param {Date} date quotation date.
     * @param {number} costCenterId cost center id.
     * @param {Date} expirationDate quotation expiration date.
     * @returns {Promise<Model>} updated quotation.
     */
    async update(id, productId, supplierId, price, date, costCenterId, expirationDate) {
        const quotation = await this.findById(id);

        if (!quotation) {
            throw new Error('Quotation not found');
        }

        return quotation.update({
            productId,
            supplierId,
            price,
            date,
            costCenterId,
            expirationDate,
        });
    }

    /**
     * Delete a quotation.
     *
     * @param {number} id quotation id.
     * @returns {Promise<void>} promise resolved when deletion is done.
     */
    async delete(id) {
        const quotation = await this.findById(id);

        if (!quotation) {
            throw new Error('Quotation not found');
        }

        return quotation.destroy();
    }

}

module.exports = QuotationService;