const CostCenterController = require("./CostCenterController");
const costCenterService = require("../../services/cost-center");

module.exports = new CostCenterController(costCenterService);