const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'pass1234',
      database: 'business_db'
    },
    console.log('Connected to the business_db database. Welcome to Employee Tracker!')
  );

  module.exports = db;