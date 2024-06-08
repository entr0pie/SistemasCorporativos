const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const supplierController = require("../../controllers/supplier");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("name").isString(),
        body("address").isString(),
        body("phone").isString(),
        body("cin").isString(),
    ),
    supplierController.create.bind(supplierController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    supplierController.findById.bind(supplierController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    supplierController.findAll.bind(supplierController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("name").isString(),
        body("address").isString(),
        body("phone").isString(),
        body("cin").isString(),
    ),
    supplierController.update.bind(supplierController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    supplierController.delete.bind(supplierController)
);

module.exports = router;

