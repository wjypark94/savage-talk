const express = require('express');
const bodyparser = require('body-parser');
let app = express();

const socket = require('socket.io');


app.use(express.static(__dirname + '/../client/main'), bodyparser());


const port = 3000;

const server = app.listen(port, function(){
    console.log('listening to port ', port);
});

io = socket(server);

io.on('connection', (socket) => { 
    console.log(socket.id); 
    
    socket.on('SEND_MESSAGE', function(data){ 
        io.emit('RECEIVE_MESSAGE', data);
     }) 
     
});

//emiting the info we received from the client(author and message) and we are sending it to everyone else