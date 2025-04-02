// config/db.js
const mysql = require('mysql2/promise'); // Import promise-based mysql2

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP default password is empty
  database: 'crud_db',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool; // Export the pool