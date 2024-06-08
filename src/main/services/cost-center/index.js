const {CostCenter} = require('../../models');
const CostCenterService = require('./CostCenterService');
const {PaginatedSearcher} = require("../data/paginated");

module.exports = new CostCenterService(CostCenter, new PaginatedSearcher(CostCenter));