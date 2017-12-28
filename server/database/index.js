const mysql = require('mysql');

let dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatInfo'
});

dbConnection.connect();

module.exports = dbConnection;

