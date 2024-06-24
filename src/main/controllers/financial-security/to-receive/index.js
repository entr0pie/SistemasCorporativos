const financialSecurityToReceiveService = require('../../../services/financial-security/to-receive');
const FinancialSecurityToReceiveController = require('./FinancialSecurityToReceiveController');

module.exports = new FinancialSecurityToReceiveController(financialSecurityToReceiveService);