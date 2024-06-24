class FinancialSecurityToReceiveController {

    /**
     * Build the controller
     *
     * @param {FinancialSecurityToReceiveService} service
     */
    constructor(service) {
        this.service = service;
    }

    /**
     * Find a financial security to receive by its id.
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const financialSecurityToReceive = await this.service.findById(id);

            if (!financialSecurityToReceive) {
                return res.status(404).send();
            }

            return res.status(200).send(financialSecurityToReceive);
        } catch (e) {
            return res.status(500).send(e.message);
        }

    }

    /**
     * Find all financial securities to receive.
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const financialSecuritiesToReceive = await this.service.findAll(page, size);
            res.status(200).send(financialSecuritiesToReceive);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    /**
     * Find a financial security to receive by its invoice.
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findByInvoice(req, res) {
        try {
            const invoice = req.params.invoice;
            const financialSecurityToReceive = await this.service.findByInvoice(invoice);

            if (!financialSecurityToReceive) {
                return res.status(404).send();
            }

            return res.status(200).send(financialSecurityToReceive);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }

    /**
     * Create a new financial security to receive.
     * @param req
     * @param res
     * @return {Promise<*>}
     */
    async cancel(req, res) {
        try {
            const id = parseInt(req.params.id);
            const financialSecurityToReceive = await this.service.cancel(id);

            if (!financialSecurityToReceive) {
                return res.status(404).send();
            }

            return res.status(200).send(financialSecurityToReceive);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
}

module.exports = FinancialSecurityToReceiveController;