const DepartmentController = require("./DepartmentController");
const departmentService = require("../../services/department");

module.exports = new DepartmentController(departmentService);