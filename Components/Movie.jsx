
class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            id: props.id,
            watched: false
        }
    }

    toggleWatched(event) {
        this.setState((prevState, props) => {
            var bool = prevState.watched === true ? false : true;
            return { watched: bool };
        });
    }

    changeButtonInfo() {
        var color = this.state.watched === false ? 'blue' : 'white';
        var background = this.state.watched === false ? 'white' : 'green';
        var text = this.state.watched === false ? 'To Watch' : 'Watched!'
        return { color, background, text };
    }


    render() {
        var { color, background, text } = this.changeButtonInfo();
        return (<div>{this.state.id}) {this.state.title}
            <button style={{ 'backgroundColor': background, 'color': color }}
                onClick={this.toggleWatched.bind(this)}>{`${text}`}</button>
        </div>);
    }

}

module.exports = Movie;