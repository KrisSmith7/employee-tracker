
const {viewAllEmployees, viewSingleEmployee, addEmployee, updateEmployee, deleteEmployee } = require('./employeeRoutes');
const options = require ('./options')
const inputCheck = require ('../utils/inputCheck')


options.options();