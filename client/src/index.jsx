import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props) 
            this.state = {
                savedList: []
            }
        
    }

    render() {
        return (
            <div>
                <h1> SAVAGE TALK </h1>
                <button onClick> Submit </button>
                <button onClick> Add Friend</button>
                <button onClick> Delete Friend</button>
                <button onClick> Emojis </button>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));