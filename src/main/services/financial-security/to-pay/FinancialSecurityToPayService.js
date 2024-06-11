/**
 * Service for creating financial security to pay.
 *
 * @author Caio Porcel
 */
class FinancialSecurityToPayService {

    /**
     * Builds a new financial security to pay service.
     *
     * @param {FinancialSecurityToPay} model
     * @param {MovementFinancialSecurityToPayService} movementService
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(model, movementService, paginatedSearcher) {
        this.model = model;
        this.movementService = movementService;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a financial security to pay by id.
     *
     * @param {number} id financial security to pay id.
     * @returns {Promise<FinancialSecurityToPay | null>} financial security to pay found.
     */
    findById(id) {
        return this.model.findByPk(id);
    }

    /**
     * Find all financial securities to pay.
     *
     * @param {number} page page number.
     * @param {number} size page size.
     * @returns {Promise<PaginatedResource>} paginated financial securities to pay.
     */
    findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Find financial security to pay by invoice.
     *
     * @param {string} invoice invoice number.
     * @returns {Promise<FinancialSecurityToPay | null>} financial security to pay found.
     */
    findByInvoice(invoice) {
        return this.model.findOne({where: {invoice: invoice}});
    }

    /**
     * Create a new financial security to pay.
     *
     * @param {string} invoice invoice number.
     * @param {number} parcels number of parcels.
     * @param {number} value total value.
     * @param {Date} expirationDate expiration date for payment.
     * @param {"OPENED" | "CLOSED"} status status.
     *
     * @returns {Promise<FinancialSecurityToPay>} created financial security to pay.
     */
    create(invoice, parcels, value, expirationDate, status) {
        return this.model.create({
            invoice: invoice,
            parcels: parcels,
            value: value,
            expirationDate: expirationDate,
            status: status
        }).then((t) => {
            return this.movementService.create(t.id, new Date(), "OPENING", value, 0, 0).then(() => {
                return t;
            });
        });
    }

    /**
     * Update a financial security to pay.
     *
     * @param {number} id financial security to pay id.
     * @param {string} invoice invoice number.
     * @param {number} parcels number of parcels.
     * @param {number} value total value.
     * @param {Date} expirationDate expiration date for payment.
     * @param {"OPENED" | "CLOSED"} status status.
     * @returns {Promise<FinancialSecurityToPay>} updated financial security to pay.
     */
    update(id, invoice, parcels, value, expirationDate, status) {
        return this.model.update({
            invoice: invoice,
            parcels: parcels,
            value: value,
            expirationDate: expirationDate,
            status: status
        }, {
            where: {id: id}
        });
    }

    /**
     * Delete a financial security to pay.
     *
     * @param {number} id financial security to pay id.
     * @returns {Promise<number>} number of deleted financial securities to pay.
     */
    delete(id) {
        return this.model.destroy({
            where: {id: id}
        });
    }
}

module.exports = FinancialSecurityToPayService;