const inquirer = require ('inquirer');
const ee = require('./employeeRoutes');
const dept = require('./deptRoutes');
const role = require('./rolesRoutes')
const inputCheck = require ('../utils/inputCheck')

module.exports.options = function () {
// prompts user with list of options to choose from
// function options() {
    inquirer
        .prompt({
            name: 'action',

            type: 'list',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Select employee by ID',
                    'Select department by ID',
                    'Select role by ID',
                    'Add an employee',
                    'Add a department',
                    'Add a role',
                    'Update employee role',
                    'Delete an employee',
                    'Delete a role',
                    'Delete a department',
                    'EXIT'
                    ]
            }).then(function (answer) {
                switch (answer.action) {
                    case 'View all employees':
                        ee.viewAllEmployees();
                        break;
                    case 'View all departments':
                        dept.viewDepartments();
                        break;
                    case 'View all roles':
                        role.viewRoles();
                        break;
                    case 'Select employee by ID':
                        ee.viewSingleEmployee();
                        break;
                    case 'Select department by ID':
                        dept.viewSingleDepartment();
                        break;
                    case 'Select role by ID':
                        role.viewSingleRole();
                        break;
                    case 'Add an employee':
                        ee.addEmployee();
                        break;
                    case 'Add a department':
                        dept.addDepartment();
                        break;
                    case 'Add a role':
                        role.addRole();
                        break;
                    case 'Update employee role':
                        ee.updateEmployee();
                        break;
                    case 'Delete an employee':
                        ee.deleteEmployee();
                        break;
                    case 'Delete a role':
                        role.deleteRole();
                        break;
                        case 'Delete a department':
                        dept.deleteDepartment();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
        };
    });
};

 