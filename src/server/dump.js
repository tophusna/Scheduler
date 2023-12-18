const fs = require('fs');
const mysql = require('mysql2');

// MySQL Connection Configuration
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'scheduler',
});

// Read SQL dump file
const sqlDumpFilePath = 'hub.sql';
const sqlQuery = fs.readFileSync(sqlDumpFilePath, 'utf-8');

// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL');

  // Execute SQL queries
  connection.query(sqlQuery, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing SQL queries:', queryErr);
    } else {
      console.log('SQL dump file imported successfully.');
    }

    // Close the MySQL connection
    connection.end();
  });
});
