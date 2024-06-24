const {Client} = require('../../models');
const {PaginatedSearcher} = require('../data/paginated');
const ClientService = require('./ClientService');

module.exports = new ClientService(Client, new PaginatedSearcher(Client));
