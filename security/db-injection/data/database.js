const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  uri: 'localhost:8000',
  database: 'security',
  user: 'root',
  password: '',
  // multipleStatements: true (stopped for protection)
})

module.exports = pool;

