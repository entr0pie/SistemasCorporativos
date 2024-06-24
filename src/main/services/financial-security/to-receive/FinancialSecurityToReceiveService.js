/**
 * Service for financial securities to receive.
 *
 * @author Caio Porcel
 */
class FinancialSecurityToReceiveService {

    /**
     * Builds a new instance of FinancialSecurityToReceiveService.
     *
     * @param {FinancialSecurityToReceive} model
     * @param {PaginatedSearcher} searcher
     * @param {InvoiceGenerator} invoiceGenerator
     */
    constructor(model, searcher, invoiceGenerator) {
        this.model = model;
        this.searcher = searcher;
        this.invoiceGenerator = invoiceGenerator;
    }

    /**
     * Find a financial security to receive by its id.
     *
     * @param {number} id
     * @return {Promise<FinancialSecurityToReceive | null>} The financial security to receive found.
     */
    findById(id) {
        return this.model.findByPk(id);
    }

    /**
     * Find all financial securities to receive.
     *
     * @param {number} page
     * @param {number} size
     * @return {Promise<PaginatedResource>}
     */
    findAll(page, size) {
        return this.searcher.search(page, size);
    }

    /**
     * Find a financial security to receive by its invoice.
     *
     * @param {string} invoice
     * @return {Promise<FinancialSecurityToReceive | null>}
     */
    findByInvoice(invoice) {
        return this.model.findOne({
            where: {
                invoice
            }
        });
    }

    /**
     * Create a new financial security to receive.
     *
     * @param {number} parcels
     * @param {number} value
     * @param {Date} expirationDate
     * @return {Promise<FinancialSecurityToReceive>}
     */
    create(parcels, value, expirationDate) {
        return this.invoiceGenerator.generate().then((invoice) => {
            return this.model.create({
                invoice,
                parcels,
                value,
                expirationDate,
                status: "OPENED"
            });
        });
    }

    /**
     * Cancel a financial security to receive.
     *
     * @param {number} id
     * @return {Promise<FinancialSecurityToReceive|null>}
     * @throws Error if the financial security is already payed.
     */
    async cancel(id) {
        const security = await this.findById(id);

        if (security.status === 'PAYED') {
            throw new Error('Cannot cancel a payed financial security');
        }

        security.status = 'CANCELED';
        await security.save();

        return security;
    }
}

module.exports = FinancialSecurityToReceiveService;