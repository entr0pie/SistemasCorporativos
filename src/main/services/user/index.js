const db = require("../../models");
const bcryptService = require("../security/bcrypt");
const jwtService = require("../security/jwt");
const UserService = require('./UserService');

module.exports = new UserService(db.User, bcryptService, jwtService);