const {SaleDetail} = require('../../models');
const productMovementService = require('../product-movement');
const SaleDetailService = require('./SaleDetailService');

module.exports = new SaleDetailService(SaleDetail, productMovementService);