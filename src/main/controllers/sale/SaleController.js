/**
 * Controller for sales.
 *
 * @author Caio Porcel
 */
class SaleController {

    /**
     * Builds a new SaleController.
     * @param {SaleService} saleService
     */
    constructor(saleService) {
        this.saleService = saleService;
    }

    async findById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const sale = await this.saleService.findById(id);

            if (!sale) {
                return res.status(404).send();
            }

            return res.status(200).send(sale);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const sales = await this.saleService.findAll(page, size);
            res.status(200).send(sales);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    async create(req, res) {
        try {
            const sellingDate = new Date(req.body.sellingDate);
            const clientId = parseInt(req.body.clientId);
            const parcels = parseInt(req.body.parcels);
            const details = req.body.details;
            const result = await this.saleService.create(sellingDate, clientId, parcels, details);
            return res.status(201).send(result);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}

module.exports = SaleController;