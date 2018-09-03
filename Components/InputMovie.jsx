var InputMovie = ({ changeHandler, inputMovieHandler }) =>
    <form>
        <input type='text' onChange={changeHandler} id='movieInputField'>
        </input>
        <button type='button' onClick={inputMovieHandler}>
            Add
        </button>
    </form>;

module.exports = InputMovie;