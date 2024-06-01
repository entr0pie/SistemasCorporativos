const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const services = require('../services');

const userController = new UserController(services.UserService);

router.post('/login', userController.login.bind(userController));
router.post('/register', userController.register.bind(userController));

module.exports = router;
