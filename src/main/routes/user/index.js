const express = require('express');
const router = express.Router();
const userController = require("../../controllers/user");

router.post("/login", userController.login.bind(userController));
router.post("/register", userController.register.bind(userController));

module.exports = router;