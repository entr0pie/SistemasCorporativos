/**
 * Generate invoice numbers for purchases and sales.
 *
 * @abstract
 * @see UUIDInvoiceGenerator
 * @author Caio Porcel
 */
class InvoiceGenerator {
    /**
     * Generates a new invoice number.
     *
     * @returns {Promise<string>} generated invoice number.
     */
    async generate() {
        throw new Error('Not implemented');
    }
}

module.exports = InvoiceGenerator;