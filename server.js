const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes/index');
const express = require ('express');
const inquirer = require ('inquirer')
// const consoleTable = require('console.table')


const PORT = process.env.PORT || 3001;
const app = express();

const inputCheck = require('./utils/inputCheck');
const { choices } = require('yargs');
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
                    'Update employee role',
                    'Delete an employee',
                    'EXIT'
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
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Update employee role':
                        updateRole();
                        break;
                    case 'Delete an employee':
                        deleteEmployee();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
        };
    });
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

// Create an employee
function addEmployee() {
    inquirer
    .prompt([{
        name:'first_name',
        type:'input',
        message:'first name?'},

        {name:'last_name',
        type:'input',
        message:'last name?'},

        {name:'roles_id',
        type:'input',
        message:'roles id?'},

        {name:'manager_id',
        type:'input',
        message:'Manager id?'},
    ])
    .then (function (body) {
    const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                  VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.roles_id, body.manager_id];

    db.query(sql, params, (err) => {
        if (err) throw err;
        console.log('Employee added.')
        viewAllEmployees();
    });
});
};

// Create a department
function addDepartment() {
    inquirer
    .prompt([{
        name:'dept_name',
        type:'input',
        message:'dept name?'},
    ])
    .then (function (body) {
    const sql = `INSERT INTO department (dept_name) 
                  VALUES (?)`;
    db.query(sql, body.dept_name, (err) => {
        if (err) throw err;
        console.log('Department added.')
        viewDepartments();
    });
});
};

//Create a role
function addRole() {
    inquirer
    .prompt([
        {
                name:'title',
                type:'input',
                message:"what's the name of this role?"
        },
        {
                name:'salary',
                type:'input',
                message:"What's the salary for this role?"
        },
        {
                name:'department_id',
                type:'input',
                message:"What's the dept id?"
        }
    ])
    .then(function (body) {
        const sql = `INSERT INTO roles (title, salary, department_id) 
                          VALUES (?,?,?)`;
            const params = [body.title, body.salary, body.department_id];
            
            db.query(sql, params, (err, result) =>  {
                if (err) throw err;
                console.log('Role added.')
                viewRoles();
            });
});
};

//Update employee role
function updateRole() {
    inquirer
    .prompt(
        {
            name: "employee_id",
            type: "input",
            message:"Which employee are you updating? Enter their employee id."
        },
        {
        name:'roles_id',
        type:'list',
        message:'roles id?',
        choices:
            viewRoles()
        },
    )
    .then(function (body) {

        const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
        const params = [body.roles_id, body.employee_id];
        
        db.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log("Employee updated.");
            viewAllEmployees();
    });
});
};

function deleteEmployee() {
    inquirer
    .prompt(
        {
            name: "employee_id",
            type: "input",
            message:"Which employee are you deleting? Enter their employee id."
        })
        .then(function (body) {

        const sql = `DELETE FROM employee WHERE id = ?`;
        const param = [body.employee_id];
        db.query(sql, param, (err) => {
            if (err) throw err;
            console.log ("Employee deleted.");
            viewAllEmployees();
            });

    });
};

function exitApp () {
    db.end();
}

options();