const mysql = require('mysql2');

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

  module.exports = db;