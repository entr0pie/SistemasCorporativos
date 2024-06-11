const FinancialSecurityToPayController = require('./FinancialSecurityToPayController');
const financialSecurityToPayService = require('../../../services/financial-security/to-pay');

module.exports = new FinancialSecurityToPayController(financialSecurityToPayService);