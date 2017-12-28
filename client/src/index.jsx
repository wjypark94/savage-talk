import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';


class App extends React.Component {
    constructor(props){
        super(props)
          this.state = {
              username: '',
              message: '',
              messages: [],
              value: ''
          };

          this.socket = io('localhost:3000');

          this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
            });

          const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
            };


          this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});
            }
            
        
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleMessage(event) {
        this.setState({
            message: event.target.value
        })
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event){
        alert('A room was created: ' + this.state.value);
        event.preventDefault();
    }


render(){
        return (
            <div>
                <h1> SAVAGE TALK </h1>
                <div>Channel</div>
                <h2>
                <div id="roomSelect">
                  <select className ="roomList" onChange={this.handleChange} value={this.state.value}>
                  <option value="lobby">lobby</option>
                  <option value="friends">friends</option>

                  </select>
                </div>
                </h2>
                <h3>
                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Chatroom..."/>
                <br/>
                <button onClick={this.handleSubmit}>Join Room</button>
                </h3>
                <div>

                </div>
              
            <div>
                <input type="text" value={this.state.username} onChange={this.handleUsername} placeholder="Username"/>
                <br/>
                <input type="text" value={this.state.message} onChange={this.handleMessage} placeholder="Message"/>
                <br/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
            <hr/>
                <div>
                {this.state.messages.map((message, i)=> {
                    return (
                        <div key={i}>{message.user}: {message.message}</div>
                    )
                })}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));