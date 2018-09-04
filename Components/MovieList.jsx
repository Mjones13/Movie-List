// var React = require('react');
// var ReactDOM = require('react-dom');
// var movies = require('./example_data');
var Movie = require('./Movie.jsx');
var Search = require('./Search.jsx');
var InputMovie = require('./InputMovie.jsx');
var $ = require('jquery');
// var request = require('request');

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: this.props.movies,
            searchedMovies: this.props.movies,
            query: '',
            newMovie: '',
            viewingToWatch: true,
            counter: 6
        };
    }

    componentWillMount() {
        // this.state.movies
        // fetch('/movies').then((response) => {
        //     console.log('i got back a response to the client fetch request');
        //     console.log('heres the response that I got: ', response.body);
        // });

        $.ajax({
            type: 'GET',
            url: '/movies',
            contentType: 'application/json',
            success: (data) => {
                // var movies = JSON.parse(data);
                console.log('i got the data from the get request', data);
                // this.setState({ movies: data, searchedMovies: data });
            },
            error: (err) => {
                console.error(err);
            }

        })
    }

    componentDidMount() {
        this.setState(() => {
            var addWatched = this.state.searchedMovies.map((movie) => {
                return { title: movie.title, watched: false }
            });
            return { searchedMovies: addWatched, movies: addWatched };
        }, () => {
        });
    }

    change(search, e) {
        var input = e.target.value;
        if (search) {
            this.setState({ query: input });
        } else {
            this.setState({ newMovie: input });
        }
    }

    addMovie() {
        var that = this;
        if (this.state.newMovie !== '') {
            var newMovie = { title: this.state.newMovie, watched: false };
            this.setState((prevState, props) => {
                var updatedMovies = prevState.movies.slice();
                updatedMovies.push(newMovie);
                console.log('the updateed movies', updatedMovies);
                return { movies: updatedMovies, newMovie: '' };
            }, () => {
                that.state.searchedMovies = that.state.movies;
                that.search();
                console.log(this.state);
            });
            document.getElementById('movieInputField').value = '';

            var newMovie2 = { title: newMovie.title, listValue: this.counter };
            this.counter++;
            $.ajax({
                type: 'POST',
                url: '/movies',
                contentType: 'application/json',
                data: JSON.stringify(newMovie2),
                success: (response) => {
                    console.log('heres the response', response);
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }

    search() {
        this.setState((prevState, props) => {
            var searchedMovies = prevState.movies.filter((movie) => {
                if (movie.title.indexOf(prevState.query) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });
            return { searchedMovies: searchedMovies, query: '' };
        })
        document.getElementById('searchInputField').value = '';
    }

    toWatched() {
        this.setState({ viewingToWatch: true });

        var watchedButton = document.getElementById('watchedButton');
        watchedButton.disabled = true;
        var toWatchButton = document.getElementById('toWatchButton')
        toWatchButton.disabled = false;
    }

    toWatch() {
        this.setState({ viewingToWatch: false });

        var toWatchButton = document.getElementById('toWatchButton');
        toWatchButton.disabled = true;
        var watchedButton = document.getElementById('watchedButton')
        watchedButton.disabled = false;
    }

    createMovieList(movies, search, viewingToWatch) {
        return movies.map((movie, index) => {
            var numMoviesInList = this.state.searchedMovies.length + 1;
            return <Movie key={index} id={index + 1} title={movie.title} />
        });
    }

    componentDidUpdate() {
        var viewingToWatch = this.state.viewingToWatch;

        var watchedButton = document.getElementById('watchedButton');
        var colors = viewingToWatch === true ? ['white', 'green'] : ['blue', 'white'];
        watchedButton.style = `background-color:${colors[1]};color:${colors[0]};`;

        var toWatchButton = document.getElementById('toWatchButton')
        colors = viewingToWatch === false ? ['white', 'green'] : ['blue', 'white'];
        toWatchButton.style = `background-color:${colors[1]};color:${colors[0]};`;
    }

    render() {
        var listOfMovies = this.createMovieList(this.state.searchedMovies, true);
        // listOfMovies = listOfMovies.filter((movie) => {
        //     // console.log(movie);
        //     if (movie.watched !== this.state.viewingToWatch) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // })
        if (listOfMovies.length === 0) {
            listOfMovies = <div>Sorry, but there are no movies with that name, please search for a different movie!</div>
        }

        return (
            <div>
                <InputMovie changeHandler={this.change.bind(this, false)} inputMovieHandler={this.addMovie.bind(this)} />
                <button onClick={this.toWatched.bind(this)} id='watchedButton'>Watched</button>
                <button onClick={this.toWatch.bind(this)} id='toWatchButton'>To Watch</button>
                <Search changeHandler={this.change.bind(this, true)} searchHandler={this.search.bind(this)} />
                {listOfMovies}
            </div>
        );
    }
}

module.exports = MovieList;