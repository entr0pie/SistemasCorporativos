const ProductMovementService = require("./ProductMovementService");
const {ProductMovement} = require("../../models");
const {PaginatedSearcher} = require("../data/paginated");

module.exports = new ProductMovementService(ProductMovement, new PaginatedSearcher(ProductMovement));