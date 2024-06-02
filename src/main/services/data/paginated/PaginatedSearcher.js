const { Model } = require("sequelize");
const PaginatedResource = require("./PaginatedResource");

/**
 * Searcher for paginated data.
 *
 * @author Thundera
 */
class PaginatedSearcher {

    /**
     * Creates a new paginated searcher.
     *
     * @param {Model} model
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Search the resource using pagination.
     *
     * @param {number} page number of the page.
     * @param {number} size size of each page.
     * @return {Promise<PaginatedResource>} paginated resource.
     */
    async search(page, size) {
        const offset = page * size;
        return this.model.findAll({ limit: size, offset: offset }).then((data) => {
            return new PaginatedResource(page, size, data.length === size, page > 0, data);
        });
    }

    /**
     * Query the resource using pagination.
     *
     * @param {any} query object with search parameters (aka. 'where').
     * @param {number} page number of the page.
     * @param {number} size size of each page.
     * @return {Promise<PaginatedResource>} paginated resource.
     */
    async query(query, page, size) {
        const offset = page * size;
        return this.model.findAll({ limit: size, offset: offset, where: query }).then((data) => {
            return new PaginatedResource(page, size, data.length === size, page > 0, data);
        });
    }
}

module.exports = PaginatedSearcher;