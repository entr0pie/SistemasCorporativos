const { Model } = require("sequelize");

/**
 * Find, create, update and delete products.
 *
 * @author Thundera
 */
class ProductService {

    /**
     * Build a new ProductService.
     *
     * @param {Model} productModel
     */
    constructor(productModel) {
        this.productModel = productModel;
    }

    /**
     * Find a product by id.
     *
     * @param {number} id
     */
    async findById(id) {
        return await this.productModel.findByPk(id);
    }

    /**
     * Create a new product.
     *
     * @param {string} name
     * @param {string} description
     * @param {boolean} isActive
     */
    async create(name, description, isActive) {
        return await this.productModel.create({
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
}

module.exports = ProductService;