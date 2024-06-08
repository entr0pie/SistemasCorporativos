const DepartmentService = require('./DepartmentService');
const {PaginatedSearcher} = require('../data/paginated');
const {Department} = require('../../models');

module.exports = new DepartmentService(Department, new PaginatedSearcher(Department));