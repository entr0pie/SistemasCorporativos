/**
 * Controller for MovementFinancialSecurityToReceive.
 *
 * @author Caio Porcel
 */
class MovementFinancialSecurityToReceiveController {
    /**
     * Constructor
     * @param {MovementFinancialSecurityToReceiveService} service
     */
    constructor(service) {
        this.service = service;
    }

    /**
     * Find a movement by id.
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    async findById(req, res) {
        try {
            const {id} = parseInt(req.params);

            const movement = await this.service.findById(id);

            if (!movement) {
                return res.status(404).send();
            }

            return res.json(movement);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    /**
     * Find all movements.
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            const movements = await this.service.findAll(page, size);

            return res.json(movements);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    /**
     * Create a new movement.
     *
     * @param {Request} req
     * @param {Response} res
     * @return {Promise<void>}
     */
    async create(req, res) {
        try {
            const {financialSecurityToReceiveId, type, value, date, fineValue, feeValue} = req.body;

            const movement = await this.service.create(financialSecurityToReceiveId, type, value, date, fineValue, feeValue);

            return res.status(201).json(movement);
        } catch (error) {
            return res.status(500).send(error);
        }

    }
}

module.exports = MovementFinancialSecurityToReceiveController;