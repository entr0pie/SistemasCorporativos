const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const productMovementController = require("../../controllers/product-movement");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("depositId").isInt(),
        body("productId").isInt(),
        body("movementType").isIn(["IN", "OUT"]),
        body("quantity").isInt(),
        body("unitaryPrice").isFloat(),
        body("date").isDate(),
    ),
    productMovementController.create.bind(productMovementController)
);

router.get("/date",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
        query("startDate").isString(),
        query("endDate").isString(),
    ),
    productMovementController.findByDateInterval.bind(productMovementController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    productMovementController.findById.bind(productMovementController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    productMovementController.findAll.bind(productMovementController)
);

router.get("/product/:productId",
    authMiddleware,
    RequestValidator(
        param("productId").isInt(),
        query("page").isInt(),
        query("size").isInt(),
    ),
    productMovementController.findByProductId.bind(productMovementController)
);

router.get("/deposit/:depositId",
    authMiddleware,
    RequestValidator(
        param("depositId").isInt(),
        query("page").isInt(),
        query("size").isInt(),
    ),
    productMovementController.findByDepositId.bind(productMovementController)
);

module.exports = router;