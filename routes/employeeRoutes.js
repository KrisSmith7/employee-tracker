const db = require('../db/connection');
const inquirer = require ('inquirer');

const options = require ('./options')

// GET all employees
function viewAllEmployees () {
    const sql = `SELECT * FROM employee ORDER BY last_name`;
    db.query(sql, (err, res) => {
        if (err) {console.log(err)};
          console.log(res)
          console.table(res); 
    });
};

// Get single employee
function viewSingleEmployee () {
  inquirer
  .prompt(
      {
          name: "employee_id",
          type: "input",
          message:"Which employee are you updating? Enter their employee id."
      })
      .then(function (answer) {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [answer.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) { console.log(err) }   
      res.json({
        message: 'success',
        data: row
      });
    });
  });
};

// Create an employee
function addEmployee () {
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
  .then (function (answer) {
const errors = inputCheck(answer, 'first_name', 'last_name', 'roles_id', 'manager_id');
    if (errors) {console.log(errors)}
    const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                  VALUES (?,?,?,?)`;
    const params = [answer.first_name, answer.last_name, answer.roles_id, answer.manager_id];
    
    db.query(sql, params, (err, result) => {
        if (err) { console.log (err) }
        console.log(result)
        console.table(answer)
    });
});
};

function updateEmployee () {
  inquirer
  .prompt(
      {
          name: "employee_id",
          type: "input",
          message:"Which employee are you updating? Enter their employee id."
      },
      {
      name:'roles_id',
      type:'input',
      message:'roles id?',
      },
  )
  .then(function (answer) {
    // Data validation
    const errors = inputCheck(answer.body, 'roles_id');
    if (errors) {console.log (errors)}
  
    const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
    const params = [answer.body.roles_id, answer.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) { console.log (err) 
      }
    //   else if (!result.affectedRows) {
    //   console.log ('Employee not found')
    //  };
     console.log(answer.body)
     console.table(result)
   });
  }
 );
};

// Delete a role
function deleteEmployee () {
  inquirer
      .prompt(
          {
              name: "employee_id",
              type: "input",
              message:"Which employee are you deleting? Enter their employee id."
          })
          .then(function (answer) {
    const sql = `DELETE FROM employee WHERE id = ?`;
    db.query(sql, answer.params.id, (err, result) => {
        if (err) {console.log(err)} else if (!result.affectedRows) {
          res.json({
            message: 'Employee not found'
          });
        } else {
          res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: answer.params.id
          });
        }
      });
    })
};

module.exports = { viewAllEmployees, viewSingleEmployee, addEmployee, updateEmployee, deleteEmployee };