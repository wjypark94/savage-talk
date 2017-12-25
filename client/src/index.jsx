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
                <input value/>
                <button onClick> Send </button>
                <h2> Buddy List </h2>
                <button onClick> Add Friend</button>
                <button onClick> Delete Friend</button>
                <h3> How do you feel </h3>
                <button onClick> Emojis </button>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));