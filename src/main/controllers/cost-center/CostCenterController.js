/**
 * Controller for cost centers.
 *
 * @author Caio Porcel
 */
class CostCenterController {

    /**
     * Builds a new CostCenterController.
     *
     * @param {CostCenterService} costCenterService
     */
    constructor(costCenterService) {
        this.costCenterService = costCenterService;
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const costCenter = await this.costCenterService.findById(id);

            if (!costCenter) {
                return res.status(404).json({message: 'Cost center not found'});
            }

            return res.json(costCenter);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async findAll(req, res) {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        try {
            const costCenters = await this.costCenterService.findAll(page, size);
            return res.json(costCenters);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async create(req, res) {
        const name = req.body.name;
        const code = req.body.code;
        try {
            const costCenter = await this.costCenterService.create(name, code);
            return res.json(costCenter);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        const code = req.body.code;
        try {
            const costCenter = await this.costCenterService.update(id, name, code);
            return res.json(costCenter);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.costCenterService.delete(id);
            return res.json({message: 'Cost center deleted'});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = CostCenterController;