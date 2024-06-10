/**
 * Purchase controller.
 *
 * @author Caio Porcel
 */
class PurchaseController {
    /**
     * Builds a new purchase controller.
     *
     * @param {PurchaseService} purchaseService
     */
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }

    async findById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const purchase = await this.purchaseService.findById(id);

            if (!purchase) {
                return res.status(404).json({
                    message: 'Purchase not found'
                });
            }

            return res.json(purchase);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const purchases = await this.purchaseService.findAll(page, size);
            return res.json(purchases);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async findByInvoice(req, res) {
        try {
            const invoice = req.params.invoice;
            const purchase = await this.purchaseService.findByInvoice(invoice);

            if (!purchase) {
                return res.status(404).json({
                    message: 'Purchase not found'
                });
            }

            return res.json(purchase);
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = PurchaseController;