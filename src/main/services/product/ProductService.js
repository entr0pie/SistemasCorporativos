const {Model} = require("sequelize");

/**
 * Find, create, update and delete products.
 *
 * @author Caio Porcel
 */
class ProductService {

    /**
     * Build a new ProductService.
     *
     * @param {Model} productModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(productModel, paginatedSearcher) {
        this.productModel = productModel;
        this.paginatedSearcher = paginatedSearcher
    }

    /**
     * Find a product by id.
     *
     * @param {number} id
     */
    async findById(id) {
        return this.productModel.findByPk(id);
    }

    /**
     * Create a new product.
     *
     * @param {string} name
     * @param {string} description
     * @param {boolean} isActive
     */
    async create(name, description, isActive) {
        return this.productModel.create({
            name: name,
            description: description,
            isActive: isActive
        });
    }

    /**
     * Update data of a product.
     *
     * @param {number} id id of the product to update.
     * @param {string} name
     * @param {string} description
     * @param {boolean} isActive
     */
    async update(id, name, description, isActive) {
        const product = await this.productModel.findByPk(id);

        if (!product) {
            throw new Error("Product not found");
        }

        product.set({
            name: name,
            description: description,
            isActive: isActive
        });

        return product.save();
    }

    /**
     * Delete a product by id.
     *
     * @param {number} id
     */
    async delete(id) {
        const product = await this.productModel.findByPk(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product.destroy();
    }

    /**
     * Find all products using pagination.
     *
     * @param {number} page
     * @param {number} size
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }
}

module.exports = ProductService;