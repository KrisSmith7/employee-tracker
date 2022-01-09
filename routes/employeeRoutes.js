const db = require('../db/connection');
const inquirer = require('inquirer');
const inputCheck = require('../utils/inputCheck');

const options = require('./options');



module.exports.viewAllEmployees = function () {
  // GET all employees
  const sql = `SELECT * FROM employee ORDER BY last_name`;
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
  //get all the employee list to make choice of employee's manager
  const employeeChoice = [{ name: 'None', value: null }]; //an employee could have no manager
  db.query("SELECT id, first_name, last_name FROM EMPLOYEE", (err, eeRes) => {
    if (err) throw err;
    eeRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
  });
  //get list of roles to make choice of employee's role
  const roleChoice = [];
  db.query("SELECT id, title FROM roles", (err, rolesRes) => {
    if (err) throw err;
    rolesRes.forEach(({ id, title }) => {
      roleChoice.push({
        name: title,
        value: id
      });
    });
  });
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
      type: 'list',
      choices: roleChoice,
      message: "What is this employee's role?"
    },

    {
      name: 'manager_id',
      type: 'list',
      choices: employeeChoice,
      message: "Who is the employee's manager? (can select none)"
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
  db.query("SELECT id, first_name, last_name FROM employee", (err, eeRes) => {
    if (err) throw err;
    console.table(eeRes)
  });
  db.query("SELECT * FROM roles", (err, roleRes) => {
    if (err) throw err;
    console.table(roleRes)
  });
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "Which employee are you updating? Enter their employee id.",
        validate: answer => {
          if (answer) {
              return true;
          } else {
              console.log('Please enter a role.')
              return false;
          }
      }
      },
      {
        name: 'roles_id',
        type: 'input',
        message: 'What is the new role? Please enter the corresponding id.',
        validate: answer => {
          if (answer) {
              return true;
          } else {
              console.log('Please enter a role.')
              return false;
          }
      }
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
