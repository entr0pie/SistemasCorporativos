const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const { body, query, param } = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const productController = require("../../controllers/product");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("name").notEmpty().isString(),
        body("description").notEmpty().isString(),
        body("isActive").isBoolean(),
    ),
    productController.create.bind(productController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    productController.findById.bind(productController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("name").notEmpty().isString(),
        body("description").notEmpty().isString(),
        body("isActive").isBoolean(),
    ),
    productController.update.bind(productController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    productController.delete.bind(productController)
);

module.exports = router;