const movementFinancialSecurityToReceiveService = require('../../../../services/financial-security/to-receive/movement');
const MovementFinancialSecurityToReceiveController = require('./MovementFinancialSecurityToReceiveController');

module.exports = new MovementFinancialSecurityToReceiveController(movementFinancialSecurityToReceiveService);