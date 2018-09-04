var express = require('express');
var app = express();
// var db = require('./database/index.js');
var models = require('./models.js');

app.use(express.json());
app.use(express.static('Client'));
// app.use(express.static(bundle.js'));



app.get('/movies', (req, res) => {
    console.log('I received a get request');


    models.movies.get((err, results) => {
        if (err) {
            return console.error(err);
        }
        // console.log('here are the results before theyre sent', results);

        // res.json('');
        res.json(results);
    });
    // res.send('hey');
    // console.log('here is the data from the server');

    // res.send('here\'s your response');
});

app.post('/movies', (req, res) => {
    // console.log('I received a post request');
    var items = [req.body.title, req.body.listValue];
    models.movies.post(items, (err, results) => {
        if (err) {
            return console.error(err);
        }

        res.json(results);
    });
});


app.listen(3000, () => {
    console.log('server is now running @ Port 3000');
});