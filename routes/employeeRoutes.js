const db = require('../db/connection');
const inquirer = require('inquirer');
const inputCheck = require('../utils/inputCheck');

const options = require('./options');

module.exports.viewAllEmployees = function () {
  // GET all employees
  // const sql = `SELECT * FROM employee ORDER BY last_name`;
  const sql = `SELECT employee.*, roles.title AS title, roles.salary AS salary, department.department_name AS dept_name
  FROM employee
  LEFT JOIN title salary dept_name`;
  db.query(sql, (err, res) => {
    if (err) { console.log(err) };
    console.table(res);
  });
  options.options();
};

// Get single employee
module.exports.viewSingleEmployee = function () {
  inquirer
    .prompt(
      {
        name: "employee_id",
        type: "input",
        message: "Which employee are you viewing? Enter their employee id.",
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log('Please enter an employee ID.')
            return false;
          }
        }
      })
    .then(function (answer) {
      const sql = `SELECT * FROM employee WHERE id = ?`;
      const params = [answer.employee_id];

      db.query(sql, params, (err, row) => {
        if (err) { console.log(err) }
        console.table(row)
      });
      options.options();
    });
};

// Create an employee
module.exports.addEmployee = function () {
  inquirer
    .prompt([{
      name: 'first_name',
      type: 'input',
      message: "What is the employee's first name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter first name.')
          return false;
        }
      }
    },

    {
      name: 'last_name',
      type: 'input',
      message: "What is the employee's last name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter last name.')
          return false;
        }
      }
    },

    {
      name: 'roles_id',
      type: 'input',
      message: 'roles id?'
    },

    {
      name: 'manager_id',
      type: 'input',
      message: 'Manager id?'
    },
    ])
    .then(function (answer) {
      const errors = inputCheck(answer, 'first_name', 'last_name', 'roles_id', 'manager_id');
      if (errors) { console.log(errors) }
      const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                  VALUES (?,?,?,?)`;
      const params = [answer.first_name, answer.last_name, answer.roles_id, answer.manager_id];

      db.query(sql, params, (err, result) => {
        if (err) { console.log(err) }
        console.log('Employee added!')
      });
      options.options();
    });
};

module.exports.updateEmployee = function () {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "Which employee are you updating? Enter their employee id."
      },
      {
        name: 'roles_id',
        type: 'input',
        message: 'What is the new role? Please enter the corresponding id.',
      },
    ])
    .then(function (answer) {
      // Data validation
      const errors = inputCheck(answer, 'roles_id', 'employee_id');
      if (errors) { console.log(errors) }

      const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
      const params = [answer.roles_id, answer.employee_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log('Employee updated!')
      });
      options.options();
    }
    );
};

// Delete a role
module.exports.deleteEmployee = function () {
  inquirer
    .prompt(
      {
        name: "employee_id",
        type: "input",
        message: "Which employee are you deleting? Enter their employee id."
      })
    .then(function (answer) {
      const sql = `DELETE FROM employee WHERE id = ?`;
      db.query(sql, answer.employee_id, (err) => {
        if (err) { console.log(err) };
        console.log('Employee deleted!')
      });
      options.options();
    })
};
