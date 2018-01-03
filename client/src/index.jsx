import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';
import axios from 'axios';

const socketUrl = "http://localhost:3000";
class App extends React.Component {
    constructor(props){
        super(props)
          this.state = {
              username: '',
              message: '',
              messages: [],
              rooms: [],
              roomName: '',
          };

          this.socket = io('localhost:3000');

          this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
            });

          const addMessage = data => {
            const name = data.user;
            const content = data.message;
            data = {
                name: name,
                content: content
            }
            this.setState({messages: [...this.state.messages, data]});
            };


          this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: this.state.username,
                message: this.state.message,
                roomName: this.state.roomName
            });
            this.setState({message: ''});
            }
            
        
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChatRoom = this.handleChatRoom.bind(this);
        this.addRoom = this.addRoom.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
        this.removeAllRooms = this.removeAllRooms.bind(this);
        this.addPrivateRoom = this.addPrivateRoom.bind(this);
    }

    componentWillMount(){
        //axios get request for all the rooms you have in database
        //then do set state, set rooms to the data you get back
        //response is data youre getting from database
        const context = this;
        axios.get("http://localhost:3000/rooms").then(function(response){
            if (response.data === null) {
                context.setState({
                    rooms: []
                })
            } else {
                context.setState({
                    rooms: response.data
                })
            }
        })
        this.initSocket();
    }

    componentWillMount(){
        const context = this;
        axios.get("http://localhost:3000/privaterooms").then(function(response){
            if (response.data === null) {
                context.setState({
                    rooms: []
                })
            } else {
                context.setState({
                    rooms: response.data
                })
            }
        })
        this.initSocket();
    }

    componentDidMount() {
        console.log(this.state.roomName)
    }

    initSocket (){
        const socket = io(socketUrl);
        socket.on('connect', ()=>{
            console.log("Connected");
        })
        this.setState({socket})

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

    getMessages() {
        const context = this;
        axios.post('http://localhost:3000/messages', {roomName: this.state.roomName}).then(function(response) {
            console.log('this is messages data', response.data )
            if (response.data === null) {
                context.setState({
                    messages: []
                })
            } else {
                context.setState({
                    messages: response.data
                })
            }
        })
    }

    handleChange(event) {
        const context = this;
        console.log("handle change working", event.target.value)
        this.setState({
            roomName: event.target.value
        }, this.getMessages);       
    }
     
    handleChatRoom(event) {
        this.setState({
            roomName: event.target.value
        });
    }

    addRoom(){
        const context = this;
        axios.post("http://localhost:3000/rooms", 
        {
            name: this.state.roomName
        }).then(function(response){
            axios.get("http://localhost:3000/rooms").then(function(response) {
                context.setState({
                    rooms: response.data
                })
            })
        })

    }

    addPrivateRoom(){
        const context = this;
        axios.post("http://localhost:3000/privaterooms", 
        {
            name: this.state.roomName
        }).then(function(response){
            axios.get("http://localhost:3000/privaterooms").then(function(response) {
                context.setState({
                    rooms: response.data
                })
            })
        })
    }

    removeRoom(){
        console.log('remoove room hitting', this.state.roomName)
        const context = this;
        axios.post("http://localhost:3000/room", 
        {
            roomName: this.state.roomName
        }).then(function(response){
            axios.get("http://localhost:3000/rooms").then(function(response) {
                context.setState({
                    rooms: response.data, 
                    messages:[] 
                });
            })
        })  
    }

    removeAllRooms(){
        const context = this;
        axios.delete("http://localhost:3000/rooms").then(function(response){
            context.setState({
                rooms: [],
                messages: []
            })
        })  
    }

render(){
        return (
            <div>
                <h1> SAVAGE TALK </h1>
                <div>Channel List</div>
                <h2>
                <div id="roomSelect">
                  <select className ="roomList" value={this.state.roomName} onChange={this.handleChange}>
                  {this.state.rooms.map((room, i)=> (
                    <option key={i} value={room.name}>{room.name}</option>
                  ))}
             
                  </select>
                </div>
                </h2>
                <h3>
                <input type="text" value={this.state.roomName} onChange={this.handleChatRoom} placeholder="Chatroom..."/>
                <br/>
                <button onClick={this.addRoom}>Create Room</button>
                <button onClick={this.removeRoom}>Leave Room</button>
                <button onClick={this.removeAllRooms}>Delete All Rooms</button>
                </h3>
                <br/>
                <input type="text" value={this.state.roomName} onChange={this.handleChatRoom} placeholder="Create Private"/>
                <button onClick={this.addPrivateRoom}>Create Private</button>
                <div>
                </div>
              
            <div>
                <br/>
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
                        <div key={i}>{message.name}: {message.content}</div>
                    )
                })}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));