const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const consoleTable = require('console.table')


// GET all employees
function viewAllEmployees () {
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee ORDER BY last_name`;
    db.query(sql, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
        //     return;
          };
          console.log(res.length + ' employees found!');
          console.table('All Employees:', res); 
          options();
        //   res.json({
        //     message: 'success',
        //     data: consoleTable([rows])
        //   });
    });
});
};

// Get single employee
router.get('/employees/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// Create an employee
router.post('/employees', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'roles_id', 'manager_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) 
                  VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.roles_id, body.manager_id];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

router.put('/employees/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'roles_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
    const params = [req.body.roles_id, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

// Delete a role
router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
          res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Employee not found'
          });
        } else {
          res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
          });
        }
      });
    });

    module.exports = { viewAllEmployees};
module.exports = router;