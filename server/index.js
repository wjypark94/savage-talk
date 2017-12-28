const express = require('express');
const bodyparser = require('body-parser');
const routers = require('./routers/index');
const db = require('./database/index');

let app = express();


const socket = require('socket.io');


app.use(express.static(__dirname + '/../client/main'), bodyparser());
app.use('/', routers);


const port = 3000;

const server = app.listen(port, function(){
    console.log('listening to port ', port);
});

io = socket(server);

io.on('connection', (socket) => { 
    console.log(socket.id); 
    
    socket.on('SEND_MESSAGE', function(data){ 
        console.log('this is data', data);
        const subquery = `SELECT id from rooms WHERE name = '${data.roomName}'`
        const sql = `INSERT INTO messages (roomID, name, content) VALUES ((${subquery}), '${data.user}', '${data.message}')`;
        db.query(sql, function(err, results) {
            io.emit('RECEIVE_MESSAGE', data);
        })
     }) 
     
});

//emiting the info we received from the client(author and message) and we are sending it to everyone else