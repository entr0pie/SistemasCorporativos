const {SaleDetail} = require('../../models');
const {SaleDetailService} = require('../sale-detail/SaleDetailService');
const {PaginatedResource} = require('../data/paginated');

/**
 * SaleService class.
 *
 * @author Caio Porcel
 */
class SaleService {
    /**
     * Builds a new SaleService.
     *
     * @param {Sale} model
     * @param {InvoiceGenerator} invoiceGenerator
     * @param {SaleDetailService} saleDetailService
     *
     */
    constructor(
        model,
        invoiceGenerator,
        saleDetailService
    ) {
        this.model = model;
        this.invoiceGenerator = invoiceGenerator;
        this.saleDetailService = saleDetailService;
    }

    /**
     * Finds a sale by its id.
     *
     * @param id sale id.
     * @returns {Promise<Sale | null>} sale found.
     */
    findById(id) {
        return this.model.findByPk(id, {
            include: [
                {model: SaleDetail, as: 'details'}
            ]
        });
    }

    /**
     * Finds all sales.
     *
     * @param {number} page
     * @param {number} size
     * @returns {Promise<PaginatedResource>}
     */
    findAll(page, size) {
        const offset = page * size;
        return this.model.findAll({
            limit: size, offset: offset, include: [
                {model: SaleDetail, as: 'details'}
            ]
        }).then((data) => {
            return new PaginatedResource(page, size, data.length === size, page > 0, data);
        });
    }

    /**
     * Create a sale.
     *
     * @see SaleDetailService#processGroup
     *
     * @param {Date} sellingDate
     * @param {number} clientId
     * @param {{ productId: number, quantity: number, unitaryPrice: number}[]} details
     */
    async create(sellingDate, clientId, details) {
        const invoice = await this.invoiceGenerator.generate();

        const sale = await this.model.create({
            invoice,
            sellingDate,
            clientId,
            status: "PENDING"
        });

        const detailsWithSale = details.map(detail => ({...detail, saleId: sale.id}));

        const processedDetails = await this.saleDetailService.processGroup(detailsWithSale);

        return {saleId: sale.id, sellingDate: sale.sellingDate, clientId: sale.clientId, details: processedDetails};
    }
}

module.exports = SaleService;