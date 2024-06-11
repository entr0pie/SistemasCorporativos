const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const departmentController = require("../../controllers/department");

router.post("/",
    RequestValidator(
        body("name").notEmpty().isString(),
    ),
    departmentController.create.bind(departmentController)
);

router.get("/:id",
    RequestValidator(
        param("id").isInt(),
    ),
    departmentController.findById.bind(departmentController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("name").notEmpty().isString(),
    ),
    departmentController.update.bind(departmentController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    departmentController.delete.bind(departmentController)
);

router.get("/",
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    departmentController.findAll.bind(departmentController)
);

module.exports = router;