const {Deposit} = require("../../models");
const DepositService = require("./DepositService");
const {PaginatedSearcher} = require("../data/paginated");

module.exports = new DepositService(Deposit, new PaginatedSearcher(Deposit));