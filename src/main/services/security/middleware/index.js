const tokenProvider = require("../auth/token-provider");
const BearerTokenMiddlewareFactory = require("./BearerTokenMiddlewareFactory");

module.exports = BearerTokenMiddlewareFactory(tokenProvider);