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
     * @param {Purchase} purchaseModel
     * @param {QuotationService} quotationService
     * @param {ProductMovementService} productMovementService
     * @param {InvoiceGenerator} invoiceGenerator
     * @param {FinancialSecurityToPayService} financialSecurityToPayService
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(
        purchaseModel,
        quotationService,
        productMovementService,
        invoiceGenerator,
        financialSecurityToPayService,
        paginatedSearcher) {
        this.purchaseModel = purchaseModel;
        this.quotationService = quotationService;
        this.productMovementService = productMovementService;
        this.invoiceGenerator = invoiceGenerator;
        this.financialSecurityToPayService = financialSecurityToPayService;
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
     * Find purchase by invoice.
     *
     * @param {string} invoice invoice number.
     * @returns {Promise<Purchase | null>} purchase found.
     */
    async findByInvoice(invoice) {
        return this.purchaseModel.findOne({where: {invoice: invoice}});
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

        const invoice = await this.invoiceGenerator.generate();

        const purchase = await this.purchaseModel.create({
            quotationId: bestQuotation.id,
            quantity: purchaseRequest.quantity,
            invoice: invoice,
            unitaryPrice: bestQuotation.price,
            parcels: purchaseRequest.parcels,
            purchaseRequestId: purchaseRequest.id,
        });

        const movement = await this.productMovementService.create(
            purchaseRequest.depositId,
            purchaseRequest.productId,
            "IN",
            purchaseRequest.quantity,
            bestQuotation.price,
            new Date()
        );

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        const financialSecurity = await this.financialSecurityToPayService.create(
            invoice,
            purchaseRequest.parcels,
            bestQuotation.price * purchaseRequest.quantity,
            expirationDate,
            "OPENED"
        );

        return purchase;
    }
}

module.exports = PurchaseService;