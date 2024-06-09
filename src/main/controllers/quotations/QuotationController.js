/**
 * Controller for managing quotations.
 *
 * @author Caio Porcel
 */
class QuotationController {

    /**
     * Builds a new QuotationController.
     *
     * @param {QuotationService} quotationService
     */
    constructor(quotationService) {
        this.quotationService = quotationService;
    }

    async create(req, res) {
        try {
            const {productId, supplierId, price, date, costCenterId, expirationDate} = req.body;
            const quotation = await this.quotationService.create(productId, supplierId, price, date, costCenterId, expirationDate);
            res.status(201).json(quotation);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async findById(req, res) {
        try {
            const {id} = req.params;
            const quotation = await this.quotationService.findById(id);

            if (!quotation) {
                return res.status(404).json({error: 'Quotation not found.'});
            }
            
            return res.json(quotation);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const {page, size} = req.query;
            const quotations = await this.quotationService.findAll(parseInt(page), parseInt(size));
            return res.json(quotations);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {productId, supplierId, price, date, costCenterId, expirationDate} = req.body;
            const quotation = await this.quotationService.update(parseInt(id), productId, supplierId, price, date, costCenterId, expirationDate);
            return res.json(quotation);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await this.quotationService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = QuotationController;