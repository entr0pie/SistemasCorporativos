const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const purchaseController = require('../../controllers/purchase');

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    purchaseController.findById.bind(purchaseController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    purchaseController.findAll.bind(purchaseController)
);

router.get("/invoice/:invoice",
    authMiddleware,
    RequestValidator(
        param("invoice").isString(),
    ),
    purchaseController.findByInvoice.bind(purchaseController)
);

module.exports = router;