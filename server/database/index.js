var mysql = require('mysql');
var dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatInfo'
});

dbConnection.connect();
module.exports = dbConnection;

