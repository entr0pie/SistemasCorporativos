const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const depositController = require("../../controllers/deposit");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("name").notEmpty().isString(),
        body("isActive").optional().isBoolean(),
    ),
    depositController.create.bind(depositController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    depositController.findById.bind(depositController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("name").notEmpty().isString(),
        body("isActive").optional().isBoolean(),
    ),
    depositController.update.bind(depositController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    depositController.findAll.bind(depositController)
);

module.exports = router;