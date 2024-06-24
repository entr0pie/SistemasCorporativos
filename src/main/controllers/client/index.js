const ClientController = require("./ClientController");
const ClientService = require("../../services/client");

module.exports = new ClientController(ClientService);