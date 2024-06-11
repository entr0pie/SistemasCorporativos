/**
 * Controller for managing purchase requests.
 *
 * @author Caio Porcel
 */
class PurchaseRequestController {
    /**
     * Build the PurchaseRequestController.
     *
     * @param {PurchaseRequestService} purchaseRequestService
     * @param {UserService} userService
     */
    constructor(purchaseRequestService, userService) {
        this.purchaseRequestService = purchaseRequestService;
        this.userService = userService;
    }

    async findById(req, res) {
        try {
            const {id} = req.params;
            const purchaseRequest = await this.purchaseRequestService.findById(id);

            if (!purchaseRequest) {
                return res.status(404).json({error: 'Purchase request not found.'});
            }

            return res.json(purchaseRequest);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const {page, size} = req.query;
            const purchaseRequests = await this.purchaseRequestService.findAll(parseInt(page), parseInt(size));
            return res.json(purchaseRequests);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async create(req, res) {
        try {
            const userId = await (async () => {
                if (!req.auth) {
                    throw new Error("Unauthorized");
                }

                const user = await this.userService.findByEmail(req.auth.getSubject());
                return user.id;
            })();

            const {productId, quantity, depositId, parcels} = req.body;
            const purchaseRequest = await this.purchaseRequestService.create(userId, productId, depositId, quantity, parcels);

            res.status(201).json(purchaseRequest);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = PurchaseRequestController;