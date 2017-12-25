import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props) 
            this.state = {
                
            }
        this.sendMessage = this.sendMessage.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.sendEmojis = this.sendEmojis.bind(this);
        
    }
    sendMessage(){
        console.log('Send message is working');
    }

    addFriend(){
        console.log('Add a Friend is working');
    }

    deleteFriend(){
        console.log('Delete Friend is working')
    }

    sendEmojis(){
        console.log('Send an emoji is working')
    }

    

    render() {
        return (
            <div>
                <h1> SAVAGE TALK </h1>
                <input type="text" placeholder="Message"/>
                <button onClick={this.sendMessage}> Send </button>
                <h2> Friends List </h2>
                <button onClick={this.addFriend}> Add Friend</button>
                <button onClick={this.deleteFriend}> Delete Friend </button>
                <h3> How do you feel </h3>
                <button onClick={this.sendEmojis}> Emojis </button>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));