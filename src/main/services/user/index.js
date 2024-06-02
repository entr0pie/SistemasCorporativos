const db = require("../../models");
const bcryptService = require("../security/password-manager/bcrypt");
const tokenProvider = require("../security/auth/token-provider");
const UserService = require('./UserService');
const { PaginatedSearcher } = require("../data/paginated");

const paginatedSearcher = new PaginatedSearcher(db.User);

module.exports = new UserService(db.User, bcryptService, tokenProvider, paginatedSearcher);