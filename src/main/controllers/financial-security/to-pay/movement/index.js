const MovementFinancialSecurityToPayController = require('./MovementFinancialSecurityToPayController');
const movementFinancialSecurityToPayService = require('../../../../services/financial-security/to-pay/movement');

module.exports = new MovementFinancialSecurityToPayController(movementFinancialSecurityToPayService);