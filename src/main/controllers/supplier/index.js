const SupplierController = require("./SupplierController");
const supplierService = require("../../services/supplier");

module.exports = new SupplierController(supplierService);
