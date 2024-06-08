const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const costCenterController = require("../../controllers/cost-center");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("name").notEmpty().isString(),
        body("code").notEmpty().isString(),
    ),
    costCenterController.create.bind(costCenterController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    costCenterController.findById.bind(costCenterController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("name").notEmpty().isString(),
        body("code").notEmpty().isString(),
    ),
    costCenterController.update.bind(costCenterController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    costCenterController.delete.bind(costCenterController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    costCenterController.findAll.bind(costCenterController)
);

module.exports = router;