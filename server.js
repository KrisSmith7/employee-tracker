const mysql = require('mysql2');
const express = require ('express');
const PORT = process.env.PORT || 3001;
const app = express();
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
//   db.query(`SELECT * FROM department`, (err, rows) => {
//     console.log(rows);
//   });

// GET a single department
// db.query(`SELECT * FROM department WHERE id = 1`, (err, row) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(row);
//   });
// Delete a department
// db.query(`DELETE FROM department WHERE id = ?`, 6, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });
// Create a department
// const sql = `INSERT INTO department (id, dept_name) 
//               VALUES (?,?)`;
// const params = [6, 'Human Resources'];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });