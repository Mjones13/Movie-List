
var Search = ({ changeHandler, searchHandler }) => (
    <form>
        <input type='text' name='name' onChange={changeHandler} id='searchInputField'></input>
        <button type='button' onClick={searchHandler}>
            Go!
        </button>
    </form>
)

module.exports = Search;
