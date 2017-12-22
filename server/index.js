const express = require('express');
const bodyparser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/main'), bodyparser());

let port = 3000;

app.listen(port, function(){
    console.log('listening to port ', port);
});