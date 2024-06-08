/**
 * Class for DepartmentController.
 *
 * @author Caio Porcel
 */
class DepartmentController {

    /**
     * Builds a new DepartmentController.
     *
     * @param {DepartmentService} departmentService
     */
    constructor(departmentService) {
        this.departmentService = departmentService;
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const department = await this.departmentService.findById(id);

            if (!department) {
                return res.status(404).json({message: 'Department not found'});
            }

            return res.json(department);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async findAll(req, res) {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        try {
            const departments = await this.departmentService.findAll(page, size);
            return res.json(departments);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async create(req, res) {
        const name = req.body.name;
        try {
            const department = await this.departmentService.create(name);
            return res.json(department);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async update(req, res) {
        const id = req.params.id;
        const name = req.body.name;
        try {
            const department = await this.departmentService.update(id, name);
            return res.json(department);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            await this.departmentService.delete(id);
            return res.json({message: 'Department deleted'});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = DepartmentController;