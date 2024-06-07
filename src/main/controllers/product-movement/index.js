const productMovementService = require("../../services/product-movement/");
const ProductMovementController = require("./ProductMovementController");

module.exports = new ProductMovementController(productMovementService);
