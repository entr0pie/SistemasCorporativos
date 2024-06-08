const {Model} = require('sequelize');
const {PaginatedSearcher, PaginatedResource} = require('../data/paginated');

/**
 * Service for creating, updating, deleting and finding suppliers.
 *
 * @author Caio Porcel
 */
class SupplierService {

    /**
     * Builds a new SupplierService.
     *
     * @param {Model} supplierModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(supplierModel, paginatedSearcher) {
        this.supplierModel = supplierModel;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a supplier by id.
     *
     * @param {number} id id of the supplier.
     * @returns {Promise<Model | null>} the supplier found.
     */
    async findById(id) {
        return this.supplierModel.findByPk(id);
    }

    /**
     * Find all suppliers paginated.
     *
     * @param {number} page page number.
     * @param {number} size number of elements per page.
     * @returns {Promise<PaginatedResource>} the suppliers found.
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Create a new supplier.
     *
     * @param {string} name name of the supplier.
     * @param {string} address address of the supplier.
     * @param {string} phone phone of the supplier.
     * @param {string} cin company identification number of the supplier.
     * @returns {Promise<Model>} the supplier created.
     */
    async create(name, address, phone, cin) {
        return this.supplierModel.create({
            name: name,
            address: address,
            phone: phone,
            cin: cin
        });
    }

    /**
     * Update a supplier.
     *
     * @param {number} id id of the supplier to be updated.
     * @param {string} name name of the supplier.
     * @param {string} address address of the supplier.
     * @param {string} phone phone of the supplier.
     * @param {string} cin company identification number of the supplier.
     * @returns {Promise<Model>} the supplier updated.
     */
    async update(id, name, address, phone, cin) {
        const supplier = await this.supplierModel.findByPk(id);
        if (!supplier) {
            throw new Error('Supplier not found');
        }

        supplier.name = name;
        supplier.address = address;
        supplier.phone = phone;
        supplier.cin = cin;

        return await supplier.save();
    }

    /**
     * Delete a supplier by id.
     *
     * @param {number} id id of the supplier to be deleted.
     * @returns {Promise<void>} promise resolved at the end of deletion.
     */
    async delete(id) {
        const suplier = await this.supplierModel.findByPk(id);
        if (!suplier) {
            throw new Error('Supplier not found');
        }

        await suplier.destroy();
    }
}

module.exports = SupplierService;