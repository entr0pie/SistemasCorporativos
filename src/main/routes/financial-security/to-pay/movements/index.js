const express = require('express');
const router = express.Router();
const RequestValidator = require("../../../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../../../services/security/middleware");
const movementFinancialSecurityToPayController = require("../../../../controllers/financial-security/to-pay/movement");

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    movementFinancialSecurityToPayController.findById.bind(movementFinancialSecurityToPayController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    movementFinancialSecurityToPayController.findAll.bind(movementFinancialSecurityToPayController)
);


router.post("/",
    authMiddleware,
    RequestValidator(
        body("financialSecurityToPayId").isInt(),
        body("date").isString(),
        body("type").isIn(["OPENING", "PAYMENT"]),
        body("value").isFloat(),
        body("fineValue").isFloat(),
        body("feeValue").isFloat(),
    ),
    movementFinancialSecurityToPayController.create.bind(movementFinancialSecurityToPayController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("date").isString(),
        body("type").isIn(["OPENING", "PAYMENT"]),
        body("value").isFloat(),
        body("fineValue").isFloat(),
        body("feeValue").isFloat(),
    ),
    movementFinancialSecurityToPayController.update.bind(movementFinancialSecurityToPayController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    movementFinancialSecurityToPayController.delete.bind(movementFinancialSecurityToPayController)
);

module.exports = router;
