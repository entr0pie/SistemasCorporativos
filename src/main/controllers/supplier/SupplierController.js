/**
 * Controller for suppliers.
 *
 * @author Caio Porcel
 */
class SupplierController {

    /**
     * Builds a new SupplierController.
     *
     * @param {SupplierService} supplierService
     */
    constructor(supplierService) {
        this.supplierService = supplierService;
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const supplier = await this.supplierService.findById(id);

            if (!supplier) {
                return res.status(404).json({message: 'Supplier not found'});
            }

            return res.json(supplier);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const suppliers = await this.supplierService.findAll(page, size);
            return res.json(suppliers);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async create(req, res) {
        try {
            const {name, address, phone, cin} = req.body;
            const supplier = await this.supplierService.create(name, address, phone, cin);
            return res.json(supplier);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const {name, address, phone, cin} = req.body;
            const supplier = await this.supplierService.update(id, name, address, phone, cin);
            return res.json(supplier);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await this.supplierService.delete(id);
            return res.json({message: 'Supplier deleted'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = SupplierController;