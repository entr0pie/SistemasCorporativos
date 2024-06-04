const {Model} = require("sequelize");

/**
 * Create, update, and retrieve deposits.
 *
 * @author Caio Porcel
 */
class DepositService {

    /**
     * Build a new DepositService.
     *
     * @param {Model} depositModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(depositModel, paginatedSearcher) {
        this.depositModel = depositModel;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Create a new deposit.
     *
     * @param {string} name
     * @param {boolean?} isActive
     */
    async create(name, isActive) {
        return this.depositModel.create({name: name, isActive: isActive});
    }

    /**
     * Update a deposit by its id.
     *
     * @param {number} id
     * @param {string} name
     * @param {boolean?} isActive
     */
    async update(id, name, isActive) {
        const deposit = await this.depositModel.findByPk(id);

        if (!deposit) {
            throw new Error("Deposit not found");
        }

        deposit.set({
            name: name,
            isActive: isActive
        });
        
        return deposit.save();
    }

    /**
     * Find all deposits using pagination.
     *
     * @param {number} page
     * @param {number} size
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Find a deposit by id.
     *
     * @param {number} id
     */
    async findById(id) {
        return this.depositModel.findByPk(id);
    }
}

module.exports = DepositService;