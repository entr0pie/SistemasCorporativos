const {Model} = require("../../models");

/**
 * Service for creating, updating, deleting and finding cost centers.
 *
 * @author Caio Porcel
 */
class CostCenterService {

    /**
     * Builds a new CostCenterService.
     *
     * @param {Model} costCenterModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(costCenterModel, paginatedSearcher) {
        this.costCenterModel = costCenterModel;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a cost center by id.
     *
     * @param {number} id
     * @returns {Promise<Model | null>} the cost center found.
     */
    async findById(id) {
        return this.costCenterModel.findByPk(id);
    }

    /**
     * Find all cost centers (paginated).
     *
     * @param {number} page number of the page.
     * @param {number} size number of elements per page.
     * @returns {Promise<PaginatedResource>} the cost centers found.
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Creates a new cost center.
     *
     * @param {string} name name of the cost center.
     * @param {string} code code of the cost center.
     * @returns {Promise<Model>} the cost center created.
     */
    async create(name, code) {
        return this.costCenterModel.create({name, code});
    }

    /**
     * Update a cost center by id.
     *
     * @param {number} id id of the cost center to update.
     * @param {string} name new name of the cost center.
     * @param {string} code new code of the cost center.
     * @returns {Promise<Model>} the cost center updated.
     */
    async update(id, name, code) {
        const costCenter = await this.findById(id);
        if (!costCenter) {
            throw new Error('Cost center not found');
        }
        costCenter.name = name;
        costCenter.code = code;
        return costCenter.save();
    }

    /**
     * Delete a cost center by id.
     *
     * @param {number} id id of the cost center to delete.
     * @returns {Promise<void>} promise resolved at the end of deletion.
     */
    async delete(id) {
        const costCenter = await this.findById(id);
        if (!costCenter) {
            throw new Error('Cost center not found');
        }
        return costCenter.destroy();
    }
}

module.exports = CostCenterService;