const { Model } = require('sequelize');
const PaginatedResource = require('./PaginatedResource');

/**
 * Creates a paginated searcher for a model.
 *
 * @param {Model} model base model for searcher creation.
 * @return {PaginatedSearcher} paginated searcher.
 *
 * @author Thundera
 */
function PaginatedSearcherFactory(model) {

    /**
     * Searcher for paginated data.
     *
     * @param {any} query object with search parameters (aka 'where' clause)
     * @param {number} page page number
     * @param {number} size size of each page
     * @return {Promise<PaginatedResource>} paginated resource
     * @constructor
     */
    async function PaginatedSearcher(query, page, size) {
        const offset = page * size;
        return model.findAll({ limit: size, offset: offset, where: query}).then((data) => {
            return new PaginatedResource(page, size, data.length === size, page > 0, data);
        });
    }

    return PaginatedSearcher;
}

module.exports = PaginatedSearcherFactory;