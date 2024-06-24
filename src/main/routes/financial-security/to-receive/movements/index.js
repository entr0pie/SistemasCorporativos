const express = require('express');
const router = express.Router();
const RequestValidator = require("../../../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../../../services/security/middleware");
const movementFinancialSecurityToReceiveController = require("../../../../controllers/financial-security/to-receive/movement");

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    movementFinancialSecurityToReceiveController.findById.bind(movementFinancialSecurityToReceiveController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    movementFinancialSecurityToReceiveController.findAll.bind(movementFinancialSecurityToReceiveController)
);

router.post("/",
    authMiddleware,
    RequestValidator(
        body("financialSecurityToReceiveId").isInt(),
        body("date").isString(),
        body("type").isIn(["OPENING", "PAYMENT"]),
        body("value").isFloat(),
        body("fineValue").isFloat(),
        body("feeValue").isFloat(),
    ),
    movementFinancialSecurityToReceiveController.create.bind(movementFinancialSecurityToReceiveController)
);

module.exports = router;