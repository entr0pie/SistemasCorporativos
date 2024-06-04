const DepositsService = require("../../services/deposit/DepositService");

/**
 * Controller for deposit interaction.
 *
 * @see DepositService
 * @author Caio Porcel
 */
class DepositController {

    /**
     * Build a new DepositController.
     *
     * @param {DepositService} depositService
     */
    constructor(depositService) {
        this.depositService = depositService;
    }

    async create(req, res) {
        const {name, isActive} = req.body;
        try {
            const deposit = await this.depositService.create(name, isActive);
            return res.json(deposit);
        } catch (e) {
            console.error("Error creating deposit: ", e);
            return res.status(500).send(e);
        }
    }

    async update(req, res) {
        const id = parseInt(req.params.id);
        const {name, isActive} = req.body;

        try {
            const deposit = await this.depositService.update(id, name, isActive);
            return res.json(deposit);
        } catch (e) {
            console.error("Error updating deposit: ", e);
            return res.status(500).send(e);
        }
    }

    async findAll(req, res) {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        try {
            const deposits = await this.depositService.findAll(page, size);
            return res.json(deposits);
        } catch (e) {
            console.error("Error getting all deposits: ", e);
            return res.status(500).send(e);
        }
    }

    async findById(req, res) {
        const id = parseInt(req.params.id);

        try {
            const deposit = await this.depositService.findById(id);
            return res.json(deposit);
        } catch (e) {
            console.error("Error finding by id: ", e);
            return res.status(404).send();
        }
    }
}

module.exports = DepositController;