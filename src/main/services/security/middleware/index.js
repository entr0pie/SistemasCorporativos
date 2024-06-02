const jwtService = require("../jwt");
const BearerTokenMiddlewareFactory = require("./BearerTokenMiddlewareFactory");

module.exports = BearerTokenMiddlewareFactory(jwtService);