const express = require('express');
const router = express.Router();
const RequestValidator = require("../../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../../services/security/middleware");
const financialSecurityToPayController = require("../../../controllers/financial-security/to-pay");
const movementsRouter = require("./movements");

router.use("/movements", movementsRouter);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    financialSecurityToPayController.findAll.bind(financialSecurityToPayController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    financialSecurityToPayController.findById.bind(financialSecurityToPayController)
);

router.get("/invoice/:invoice",
    authMiddleware,
    RequestValidator(
        param("invoice").isString(),
    ),
    financialSecurityToPayController.findByInvoice.bind(financialSecurityToPayController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    financialSecurityToPayController.cancel.bind(financialSecurityToPayController)
);

module.exports = router;
