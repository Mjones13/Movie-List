// var React = require('react');
// var ReactDOM = require('react-dom');
// var movies = require('./example_data');
var Movie = require('./Movie.jsx');
var Search = require('./Search.jsx');
var InputMovie = require('./InputMovie.jsx');

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: this.props.movies,
            searchedMovies: this.props.movies,
            query: '',
            newMovie: '',
            viewingToWatch: true
        };
    }

    componentDidMount() {
        // console.log('this runs first');
        this.setState(() => {
            var addWatched = this.prevState.searchedMovies.map((movie) => {
                // movie['watched'] = false;
                return { title: movie.title, watched: false }
            });
            return { searchedMovies: addWatched };
        }, () => {
        });
        console.log('this is the state ', this.state);
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
                return { movies: updatedMovies, newMovie: '' };
            }, () => {
                that.state.searchedMovies = that.state.movies;
                that.search();
                // console.log('this is the state', this.state);
            });
            document.getElementById('movieInputField').value = '';
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
        this.setState({ viewingToWatch: true }, () => {
            this.setState(() => {
                console.log(this.state);
            })
        });
        var watchedButton = document.getElementById('watchedButton');
        watchedButton.disabled = true;
        var toWatchButton = document.getElementById('toWatchButton')
        toWatchButton.disabled = false;
    }

    toWatch() {
        this.setState({ viewingToWatch: false }, () => {
            // console.log(this.state.viewingToWatch);
        });
        var toWatchButton = document.getElementById('toWatchButton');
        toWatchButton.disabled = true;
        var watchedButton = document.getElementById('watchedButton')
        watchedButton.disabled = false;

    }

    componentDidUpdate() {
        // console.log('i got called');
        var watchedButton = document.getElementById('watchedButton');
        // console.log('here\'s the watched button', watchedButton);
        var colors = this.state.viewingToWatch === true ? ['white', 'green'] : ['blue', 'white'];
        watchedButton.style = `background-color:${colors[1]};color:${colors[0]};`;

        var toWatchButton = document.getElementById('toWatchButton')
        colors = this.state.viewingToWatch === false ? ['white', 'green'] : ['blue', 'white'];
        toWatchButton.style = `background-color:${colors[1]};color:${colors[0]};`;
    }


    createMovieList(movies, search, viewingToWatch) {
        return movies.map((movie, index) => {
            var numMoviesInList = this.state.searchedMovies.length + 1;
            return <Movie key={index} id={index + 1} title={movie.title} />
        });
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

        // var watchedButton = document.getElementById('watchedButton');
        // var colors = this.viewingToWatch === false ? ['white', 'green'] : ['blue', 'white'];
        // watchedButton.style = { color: colors[0], backgroundColor: colors[1] };

        // var toWatchButton = document.getElementById('toWatchButton')
        // colors = this.toWatchButton === true ? ['white', 'green'] : ['blue', 'white'];
        // toWatchButton.style = { color: colors[0], backgroundColor: colors[1] };
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
// ReactDOM.render(<MovieList />, document.getElementById('reactContainer'));

module.exports = MovieList;