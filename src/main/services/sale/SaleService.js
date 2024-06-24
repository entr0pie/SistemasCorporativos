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
     * @param {FinancialSecurityToReceiveService} financialSecurityToReceiveService
     * @param {MovementFinancialSecurityToReceiveService} movementFinancialSecurityToReceiveService
     */
    constructor(
        model,
        invoiceGenerator,
        saleDetailService,
        financialSecurityToReceiveService,
        movementFinancialSecurityToReceiveService,
    ) {
        this.model = model;
        this.invoiceGenerator = invoiceGenerator;
        this.saleDetailService = saleDetailService;
        this.financialSecurityToReceiveService = financialSecurityToReceiveService;
        this.movementFinancialSecurityToReceiveService = movementFinancialSecurityToReceiveService;
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
     * @param {number} parcels
     * @param {{ productId: number, quantity: number, unitaryPrice: number}[]} details
     */
    async create(sellingDate, clientId, parcels, details) {
        const invoice = await this.invoiceGenerator.generate();

        const sale = await this.model.create({
            invoice,
            sellingDate,
            clientId,
            status: "PENDING"
        });

        const detailsWithSale = details.map(detail => ({...detail, saleId: sale.id}));

        let processedDetails;

        try {
            processedDetails = await this.saleDetailService.processGroup(detailsWithSale);
        } catch (error) {
            await this.model.update({status: "REJECTED"}, {where: {id: sale.id}});
            throw error;
        }

        await this.model.update({status: "OPENED"}, {where: {id: sale.id}});

        const value = processedDetails.reduce((acc, detail) => acc + (detail.quantity * detail.unitaryPrice), 0);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        await this.financialSecurityToReceiveService.create(parcels, value, expirationDate);

        await this.movementFinancialSecurityToReceiveService.create(sale.id, "OPENING", value, new Date(), 0, 0);

        return {saleId: sale.id, sellingDate: sale.sellingDate, clientId: sale.clientId, details: processedDetails};
    }
}

module.exports = SaleService;