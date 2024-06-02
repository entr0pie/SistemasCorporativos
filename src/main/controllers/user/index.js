const userService = require("../../services/user");
const UserController = require("./UserController");

module.exports = new UserController(userService);