/**
 * Controller for Product Movement operations.
 *
 * @author Caio Porcel
 */
class ProductMovementController {

    /**
     * Build a new ProductMovementController.
     *
     * @param {ProductMovementService} productMovementService
     */
    constructor(productMovementService) {
        this.productMovementService = productMovementService;
    }

    async create(req, res) {
        const {depositId, productId, movementType, quantity, unitaryPrice, date} = req.body;
        const parsedDate = new Date(date);

        try {
            const productMovement = await this.productMovementService.create(depositId, productId, movementType, quantity, unitaryPrice, parsedDate);
            return res.status(201).send(productMovement);
        } catch (e) {
            console.error(e);
            return res.status(403).send();
        }
    }

    async findById(req, res) {
        const {id} = req.params;

        try {
            const productMovement = await this.productMovementService.findById(id);
            if (!productMovement) {
                return res.status(404).send();
            }
            return res.status(200).send(productMovement);
        } catch (e) {
            console.error(e);
            return res.status(403).send();
        }
    }

    async findAll(req, res) {
        let {page, size} = req.query;

        page = parseInt(page);
        size = parseInt(size);

        try {
            const productMovements = await this.productMovementService.findAll(page, size);
            return res.status(200).send(productMovements);
        } catch (e) {
            console.error(e);
            return res.status(403).send();
        }
    }

    async findByProductId(req, res) {
        const {productId} = req.params;
        let {page, size} = req.query;

        page = parseInt(page);
        size = parseInt(size);

        try {
            const productMovements = await this.productMovementService.findByProductId(productId, page, size);
            return res.status(200).send(productMovements);
        } catch (e) {
            console.error(e);
            return res.status(403).send();
        }
    }

    async findByDepositId(req, res) {
        const {depositId} = req.params;
        let {page, size} = req.query;

        page = parseInt(page);
        size = parseInt(size);

        try {
            const productMovements = await this.productMovementService.findByDepositId(depositId, page, size);
            return res.status(200).send(productMovements);
        } catch (e) {
            console.error(e);
            return res.status(403).send();
        }
    }

    async findByDateInterval(req, res) {
        const {startDate, endDate} = req.query;
        let {page, size} = req.query;

        page = parseInt(page);
        size = parseInt(size);

        try {
            const [parsedStartDate, parsedEndDate] = [new Date(startDate), new Date(endDate)];
            const productMovements = await this.productMovementService.findByDateInterval(parsedStartDate, parsedEndDate, page, size);
            return res.status(200).send(productMovements);
        } catch (e) {
            console.error(e);
            return res.status(403).send();
        }
    }

}

module.exports = ProductMovementController;