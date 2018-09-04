
var db = require('./database/index.js')

module.exports = {
    movies: {
        get: (callback) => {
            console.log('this is what the databse looks like')
            var getAllQuery = 'SELECT (title) from movies';
            db.query(getAllQuery, (err, results, field) => {
                if (err) {
                    return callback(err, null);
                }
                console.log('here are the results u wanted: ', results);
                callback(null, results);
            });
        },
        post: (params, callback) => {
            var insertQuery = 'INSERT INTO movies (title, listValue) VALUES (?, ?)';
            db.query(insertQuery, params, (err, results, field) => {
                if (err) {
                    return callback(err, null);
                }
                console.log('here are the results u wanted: ', results);
                callback(null, results);
            });
        }
    }
}
