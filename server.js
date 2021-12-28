const mysql = require('mysql2');
const express = require ('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'i5wEoR>&$@T0',
      database: 'business_db'
    },
    console.log('Connected to the business_db database.')
  );

//DEPARTMENT ROUTES--------------------------------
  
// GET all departments
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: rows
          });
    });
})  

// GET a single department
app.get ('/api/department/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
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
        })
  });
// Delete a department
app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Department not found'
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
// Create a department
app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(body, 'dept_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO department (dept_name) 
                  VALUES (?)`;
    const params = [body.dept_name];
    
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

//ROLES ROUTES ----------------------------------------
// GET all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT roles.*, department.dept_name
                AS department_name
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: 'success',
            data: rows
          });
    });
})  

// GET a single role
app.get ('/api/roles/:id', (req, res) => {
    const sql = `SELECT roles.*, department.dept_name
                AS department_name
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id
                WHERE roles.id = ?`;
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
        })
  });

  // Delete a department
app.delete('/api/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Role not found'
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

    // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });