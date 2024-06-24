const express = require('express');
const router = express.Router();
const RequestValidator = require("../../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../../services/security/middleware");
const financialSecurityToReceiveController = require("../../../controllers/financial-security/to-receive");
const movements = require("./movements");

router.use("/movements", movements);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    financialSecurityToReceiveController.findAll.bind(financialSecurityToReceiveController)
);

router.get("/:id",
    RequestValidator(
        param("id").isInt(),
    ),
    financialSecurityToReceiveController.findById.bind(financialSecurityToReceiveController)
);

router.get("/invoice/:invoice",
    RequestValidator(
        param("invoice").isString(),
    ),
    financialSecurityToReceiveController.findByInvoice.bind(financialSecurityToReceiveController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    financialSecurityToReceiveController.cancel.bind(financialSecurityToReceiveController)
);

module.exports = router;
