const db = require('../db/connection');
const inquirer = require('inquirer');
const inputCheck = require('../utils/inputCheck')
const options = require('./options');
const { registerPrompt } = require('inquirer');

// GET all roles
module.exports.viewRoles = function () {
    const sql = `SELECT roles.*, department.dept_name
                AS department_name
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id;`;
    db.query(sql, (err, res) => {
        if (err) { console.log(err) };
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
                message: "Which role are you viewing? Enter the corresponding id.",
                validate: idInput => {
                    if (idInput) {
                        return true;
                    } else {
                        console.log('Please enter a role.')
                        return false;
                    }
                }
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
                console.table(row)
            });
            options.options();
        });
};

// Create a role
module.exports.addRole = function () {
    //get the list of all department with department_id to make the choices object list for prompt question
    const departments = [];
    db.query("SELECT * FROM department", async (err, res) => {
        if (err) throw err;
        await res.forEach(dept => {
            let deptChoice = {
                name: dept.dept_name,
                value: dept.id,
            }
            departments.push(deptChoice);
        });
    })
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of this role?',
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log('Please enter a role.')
                        return false;
                    }
                }
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this position?',
                validate: salary => {
                    if (salary) {
                        return true;
                    } else {
                        console.log('Please enter a valid salary for this position.')
                        return false;
                    }
                }
            },
            {
                name: 'department_id',
                type: 'list',
                choices: departments,
                message: 'What is the corresponding department?'
            }
        ])
        .then(function (answer) {
            const errors = inputCheck(answer, 'title', 'salary', 'department_id');
            if (errors) { (console.log(errors)) };

            const sql = `INSERT INTO roles (title, salary, department_id) 
                  VALUES (?,?,?)`
            const params = [answer.title, answer.salary, answer.department_id];

            db.query(sql, params, (err) => {
                if (err) { console.log(err) }
                console.log('Role added!');
                console.table(answer)
            });
            options.options();
        });
};

// Delete a role
module.exports.deleteRole = function () {
    //get the list of all roles with ids to make the choices object list for prompt question
    const roleChoices = [];
    db.query("SELECT title, id FROM roles", async (err, res) => {
        if (err) throw err;
        console.log(res)
        // await res.map(role => {
        //     let choice = {
        //         name: role.title,
        //         value: role.id,
        //     }
        //     roleChoices.push(choice);
        // });
        //     console.log(roleChoices);
    })
    inquirer
        .prompt([
            {
                name: "role_id",
                type: "input",
                message: "Which role are you deleting? Enter the corresponding ID.",
                // choices: roleChoices,
            }])
        .then(function (answer) {
            const sql = `DELETE FROM roles WHERE id = ?`;
            const params = [answer.role_id];
            db.query(sql, params, (err) => {
                if (err) { console.log(err) };
                console.table('Role deleted.')
            });
            options.options();
        });
};
