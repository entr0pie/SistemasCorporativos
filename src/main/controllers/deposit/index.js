const depositService = require('../../services/deposit');
const DepositController = require('./DepositController');

module.exports = new DepositController(depositService);