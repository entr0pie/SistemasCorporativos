/**
 * Controller for the financial security to pay.
 *
 * @author Caio Porcel
 */
class FinancialSecurityToPayController {

    /**
     * Builds a new controller with a financial security to pay service.
     *
     * @param {FinancialSecurityToPayService} service
     */
    constructor(service) {
        this.service = service;
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const financialSecurityToPay = await this.service.findById(id);
            if (!financialSecurityToPay) {
                return res.status(404).send();
            }
            return res.status(200).json(financialSecurityToPay);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const financialSecuritiesToPay = await this.service.findAll(page, size);
            return res.status(200).json(financialSecuritiesToPay);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async findByInvoice(req, res) {
        try {
            const invoice = req.params.invoice;
            const financialSecurityToPay = await this.service.findByInvoice(invoice);
            if (!financialSecurityToPay) {
                return res.status(404).send();
            }
            return res.status(200).json(financialSecurityToPay);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async cancel(req, res) {
        try {
            const id = req.params.id;
            await this.service.cancel(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
}

module.exports = FinancialSecurityToPayController;