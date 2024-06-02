const db = require("../../models");
const bcryptService = require("../security/password-manager/bcrypt");
const tokenProvider = require("../security/auth/token-provider");
const UserService = require('./UserService');

module.exports = new UserService(db.User, bcryptService, tokenProvider);