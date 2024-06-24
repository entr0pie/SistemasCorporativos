const express = require('express');
const router = express.Router();
const RequestValidator = require("../../services/data/request-validator");
const {body, query, param} = require("express-validator");
const authMiddleware = require("../../services/security/middleware");
const clientController = require("../../controllers/client");

router.post("/",
    authMiddleware,
    RequestValidator(
        body("name").notEmpty().isString(),
        body("phone").notEmpty().isString(),
        body("documentNumber").notEmpty().isString(),
    ),
    clientController.create.bind(clientController)
);

router.get("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    clientController.findById.bind(clientController)
);

router.put("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
        body("name").notEmpty().isString(),
        body("phone").notEmpty().isString(),
        body("documentNumber").notEmpty().isString(),
    ),
    clientController.update.bind(clientController)
);

router.get("/",
    authMiddleware,
    RequestValidator(
        query("page").isInt(),
        query("size").isInt(),
    ),
    clientController.findAll.bind(clientController)
);

router.delete("/:id",
    authMiddleware,
    RequestValidator(
        param("id").isInt(),
    ),
    clientController.delete.bind(clientController)
);

module.exports = router;