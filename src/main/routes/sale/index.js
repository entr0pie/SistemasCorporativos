const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const saleController = require("../../controllers/sale");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("sellingDate").notEmpty().isString(),
        body("clientId").notEmpty().isInt(),
        body("details").isArray(),
    ),
    saleController.create.bind(saleController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    saleController.findById.bind(saleController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    saleController.findAll.bind(saleController)
);

module.exports = router;