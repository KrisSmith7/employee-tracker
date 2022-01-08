const db = require('../db/connection');
const inquirer = require ('inquirer');
const inputCheck = require ('../utils/inputCheck')
const options = require ('./options');
//DEPARTMENT ROUTES--------------------------------
  
// GET all departments
module.exports.viewDepartments = function () {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) {console.log(err)};
          console.table(res); 
    });
    options.options();;
}


// GET a single department
module.exports.viewSingleDepartment = function () {
    inquirer
  .prompt(
      {
          name: "dept_id",
          type: "input",
          message:"Which dept are you viewing? Enter the corresponding id."
      })
      .then(function (answer) {
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [answer.dept_id];
  
    db.query(sql, params, (err, row) => {
      if (err) { console.log(err) }   
      console.table (row)
    });
    options.options();
  });
  };

// Delete a department
module.exports.deleteDepartment = function () {
    inquirer
    .prompt(
        {
            name: "dept_id",
            type: "input",
            message:"Which department are you deleting? Enter the department id."
        })
        .then(function (answer) {
    const sql = `DELETE FROM department WHERE id = ?`;
    db.query(sql, answer.dept_id, (err) => {
        if (err) {console.log(err)};
        console.log ('Dept deleted!')
        });
    options.options();
    })
    };

// Create a department
module.exports.addDepartment = function () {
    inquirer
  .prompt([{
      name:'dept_name',
      type:'input',
      message:'Dept name?'},
  ])
  .then(function (answer) {
    const errors = inputCheck(answer, 'dept_name');
    if (errors) { console.log(errors) }
    const sql = `INSERT INTO department (dept_name) 
                  VALUES (?)`;
    const params = [answer.dept_name];

    db.query(sql, params, (err) => {
        if (err) { console.log (err) }
        console.log('Department added!')
      });
      options.options();
});
};