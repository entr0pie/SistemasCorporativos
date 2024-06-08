const express = require('express');
const router = express.Router();
const userController = require("../../controllers/user");
const RequestValidator = require("../../services/data/request-validator");
const {body, query} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");

router.post("/login",
    RequestValidator(
        body("email").notEmpty().isEmail(),
        body("password").notEmpty().isString(),
    ),
    userController.login.bind(userController)
);

router.post("/register",
    RequestValidator(
        body("email").notEmpty().isEmail(),
        body("password").notEmpty().isString(),
        body("departmentId").notEmpty().isInt(),
    ),
    userController.register.bind(userController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    userController.findAll.bind(userController),
);

module.exports = router;