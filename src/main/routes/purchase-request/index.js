const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const purchaseRequestController = require("../../controllers/purchase-request");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("productId").isInt(),
        body("quantity").isInt(),
    ),
    purchaseRequestController.create.bind(purchaseRequestController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    purchaseRequestController.findById.bind(purchaseRequestController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    purchaseRequestController.findAll.bind(purchaseRequestController)
);

module.exports = router;

