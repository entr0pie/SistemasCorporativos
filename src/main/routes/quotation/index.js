const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const quotationController = require("../../controllers/quotations");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("productId").isInt(),
        body("supplierId").isInt(),
        body("price").isFloat(),
        body("date").isDate(),
        body("costCenterId").isInt(),
        body("expirationDate").isString(),
    ),
    quotationController.create.bind(quotationController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    quotationController.findById.bind(quotationController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    quotationController.findAll.bind(quotationController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("productId").isInt(),
        body("supplierId").isInt(),
        body("price").isFloat(),
        body("date").isDate(),
        body("costCenterId").isInt(),
        body("expirationDate").isString(),
    ),
    quotationController.update.bind(quotationController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    quotationController.delete.bind(quotationController)
);

module.exports = router;