const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes/index');
const express = require ('express');
const inquirer = require ('inquirer')
// const consoleTable = require('console.table')


const PORT = process.env.PORT || 3001;
const app = express();

const inputCheck = require('./utils/inputCheck');
// const { viewAllEmployees } = require('./routes/apiRoutes/employeeRoutes');
//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use apiRoutes
app.use('/api', apiRoutes);


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// // prompts user with list of options to choose from
function options() {
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
//                     'Update employee role',
//                     'Delete an employee',
//                     'EXIT'
                    ]
            }).then(function (answer) {
                switch (answer.action) {
                    case 'View all employees':
                        viewAllEmployees();
                        break;
                    case 'View all departments':
                        viewDepartments();
                        break;
                    case 'View all roles':
                        viewRoles();
                        break;
//                     case 'Add an employee':
//                         addEmployee();
//                         break;
//                     case 'Add a department':
//                         addDepartment();
//                         break;
//                     case 'Add a role':
//                         addRole();
//                         break;
//                     case 'Update employee role':
//                         updateRole();
//                         break;
//                     case 'Delete an employee':
//                         deleteEmployee();
//                         break;
//                     case 'EXIT': 
//                         exitApp();
//                         break;
//                     default:
//                         break;
                }
        })
};

// view all employees in the database
function viewAllEmployees() {
    const query = `SELECT * FROM employee ORDER BY last_name`;
    db.query(query, function(err, res) {
        if (err) throw err; 
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        options();
    })
};

// view all departments in the database
function viewDepartments() {
    const query = `SELECT * FROM department`;
    db.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

// // view all roles in the database
function viewRoles() {
    const query = `SELECT roles.*, department.dept_name
    AS department_name
    FROM roles
    LEFT JOIN department
    ON roles.department_id = department.id;`;
    db.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

options();