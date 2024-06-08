const {Model} = require("sequelize");
const {PaginatedSearcher, PaginatedResource} = require("../data/paginated");

/**
 * Service for creating, updating, deleting and finding departments.
 *
 * @author Caio Porcel
 */
class DepartmentService {

    /**
     * Builds a new DepartmentService.
     *
     * @param {Model} departmentModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(departmentModel, paginatedSearcher) {
        this.departmentModel = departmentModel;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a department by id.
     *
     * @param {number} id
     * @returns {Promise<Model | null>} the department found
     */
    async findById(id) {
        return this.departmentModel.findByPk(id);
    }

    /**
     * Find all departments.
     *
     * @param {number} page number of the page.
     * @param {number} size number of elements per page.
     *
     * @returns {Promise<PaginatedResource>} the departments found.
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Create a new department.
     *
     * @param {string} name name of the department.
     * @returns {Promise<Model>} the department created.
     */
    async create(name) {
        return this.departmentModel.create({name});
    }

    /**
     * Update a department.
     *
     * @param {number} id id of the department to be updated.
     * @param {string} name new name of the department.
     *
     * @returns {Promise<Model>} the department updated.
     */
    async update(id, name) {
        const department = await this.departmentModel.findByPk(id);
        department.name = name;
        return department.save();
    }

    /**
     * Delete a department.
     *
     * @param {number} id id of the department to be deleted.
     * @returns {Promise<void>} promise resolved at the end of deletion.
     */
    async delete(id) {
        return this.departmentModel.destroy({where: {id}});
    }
}

module.exports = DepartmentService;