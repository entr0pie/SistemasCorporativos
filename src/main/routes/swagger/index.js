const Router = require("express").Router;

const fs = require("fs");
const YAML = require("yaml");
const file = fs.readFileSync("./docs/corporate_systems_swagger.yml", "utf8");
const swaggerDocument = YAML.parse(file);
const swaggerUi = require("swagger-ui-express");


const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;