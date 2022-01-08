const db = require('../db/connection');
const inquirer = require ('inquirer');
const inputCheck = require ('../utils/inputCheck')
const options = require ('./options');
//ROLES ROUTES ----------------------------------------
// GET all roles
module.exports.viewRoles = function () {
    const sql = `SELECT roles.*, department.dept_name
                AS department_name
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id;`;
   db.query(sql, (err, res) => {
        if (err) {console.log(err)};
          console.table(res); 
    });
    options.options();
};


// GET a single role
module.exports.viewSingleRole = function () {
    inquirer
    .prompt(
        {
            name: "role_id",
            type: "input",
            message:"Which role are you viewing? Enter the corresponding id."
        })
        .then(function (answer) {

    const sql = `SELECT roles.*, department.dept_name
                AS department_name
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id
                WHERE roles.id = ?`;
    const params = [answer.role_id];
    db.query(sql, params, (err, row) => {
            if (err) { console.log(err) }   
            console.table (row)
          });
          options.options();
  });
};

  // Create a role
  module.exports.addRole = function () {
    inquirer
    .prompt([

        {name:'title',
        type:'input',
        message:'Title?'},
  
        {name:'salary',
        type:'input',
        message:'Salary?'},
  
        {name:'department_id',
        type:'input',
        message:'Dept id?'},
    ])
    .then(function (answer) {
    const errors = inputCheck(answer, 'title', 'salary', 'department_id');
    if (errors) { (console.log (errors))};

    const sql = `INSERT INTO roles (title, salary, department_id) 
                  VALUES (?,?,?)`
    const params = [answer.title, answer.salary, answer.department_id];
    
    db.query(sql, params, (err) => {
        if (err) {console.log(err)}
       console.table(answer)
    });
    options.options();
});
};

  // Delete a role
  module.exports.deleteRole = function () {
    inquirer
    .prompt(
        {
            name: "role_id",
            type: "input",
            message:"Which role are you deleting? Enter the corresponding id."
        })
    .then (function (answer) {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [answer.role_id];
    db.query(sql, params, (err) => {
        if (err) {console.log(err)};
        console.table('Role deleted.')
  });
  options.options();
        });
    };
