var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

var movie1 = { title: 'Hey there friend', key: '5' };

connection.connect((err) => {
    if (err) {
        return console.error(err);
    }
});

module.exports = connection;

