var mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect(function(err) {
    if (!err) {
        console.log("datebase connected");
    } else {
        console.log("database not connected");
    }
})

module.exports = connection;