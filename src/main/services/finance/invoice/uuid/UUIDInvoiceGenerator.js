const InvoiceGenerator = require('../InvoiceGenerator');
const {v4} = require('uuid');

/**
 * Generates invoices using UUID v4.
 *
 * @extends InvoiceGenerator
 * @author Caio Porcel
 */
class UUIDInvoiceGenerator extends InvoiceGenerator {
    async generate() {
        return v4();
    }
}

module.exports = UUIDInvoiceGenerator;