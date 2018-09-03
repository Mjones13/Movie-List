var express = require('express');
var app = express();

app.use(express.json());
app.use(express.static('Client'));
app.use(express.static('./dist/bundle.js'));


app.get('/', (req, res) => {
    console.log('I recieved a get request');
    res.end();
});

app.post('/', (req, rest) => {
    console.log('I recieved a post request');
    res.end();
});


app.listen(3000, () => {
    console.log('server is now running @ Port 3000');
});