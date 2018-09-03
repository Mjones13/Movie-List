var React = require('react');
var ReactDOM = require('react-dom');
var MovieList = require('./MovieList.jsx');
var movies = require('../example_data.js');

ReactDOM.render(<MovieList movies={movies} />, document.getElementById('reactContainer'));

