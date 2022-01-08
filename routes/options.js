const inquirer = require ('inquirer');
const ee = require('./employeeRoutes');

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
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
                    case 'Add an employee':
                        ee.addEmployee();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Update employee role':
                        updateEmployee();
                        break;
                    case 'Delete an employee':
                        ee.deleteEmployee();
                        break;
                    case 'Delete a role':
                        deleteRole();
                        break;
                        case 'Delete a department':
                        deleteDepartment();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
        };
    });
};

 