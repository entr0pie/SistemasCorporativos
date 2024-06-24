const {MovementFinancialSecurityToReceive} = require('../../../../models');
const {PaginatedSearcher} = require('../../../data/paginated');
const financialSecurityToReceiveService = require('../index');
const MovementFinancialSecurityToReceiveService = require('./MovementFinancialSecurityToReceiveService');

module.exports = new MovementFinancialSecurityToReceiveService(
    MovementFinancialSecurityToReceive,
    new PaginatedSearcher(MovementFinancialSecurityToReceive),
    financialSecurityToReceiveService
);