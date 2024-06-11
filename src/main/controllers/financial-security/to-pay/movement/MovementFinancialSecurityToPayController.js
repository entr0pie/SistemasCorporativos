const FinancialSecurityToPayController = require('../FinancialSecurityToPayController');

/**
 * Creating, updating, deleting and finding financial security to pay movements.
 *
 * @author Caio Porcel
 * @see FinancialSecurityToPayController
 */
class MovementFinancialSecurityToPayController {
    /**
     * Builds a new controller with a financial security to pay movement service.
     *
     * @param {MovementFinancialSecurityToPayService} service
     */
    constructor(service) {
        this.service = service;
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const movement = await this.service.findById(id);
            if (!movement) {
                return res.status(404).send();
            }
            return res.status(200).json(movement);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const movements = await this.service.findAll(page, size);
            return res.status(200).json(movements);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async create(req, res) {
        try {
            const financialSecurityToPayId = req.body.financialSecurityToPayId;
            const date = req.body.date;
            const type = req.body.type;
            const value = req.body.value;
            const fineValue = req.body.fineValue;
            const feeValue = req.body.feeValue;
            const movement = await this.service.create(financialSecurityToPayId, date, type, value, fineValue, feeValue);
            return res.status(201).json(movement);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const date = req.body.date;
            const type = req.body.type;
            const value = req.body.value;
            const fineValue = req.body.fineValue;
            const feeValue = req.body.feeValue;
            const movement = await this.service.update(id, date, type, value, fineValue, feeValue);
            if (!movement) {
                return res.status(404).send();
            }
            return res.status(200).json(movement);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const movement = await this.service.delete(id);
            if (!movement) {
                return res.status(404).send();
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
}

module.exports = MovementFinancialSecurityToPayController;