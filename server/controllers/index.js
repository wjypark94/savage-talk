const db = require('../database/index.js');



exports.getRooms = function(req, res){
 const sql = 'SELECT * FROM rooms' 
  db.query(sql, function(err, data){
      console.log('this is data', data);
      res.json(data)
  })
};

exports.addRoom = function(req, res) {
    console.log('this is req.body', req.body)
    const sql = `INSERT INTO rooms (name) VALUES ('${req.body.name}')`;
    db.query(sql, function(err, data) {
        res.send('posted into database');
    })
};

exports.getMessages = function(req, res) {
    console.log('this is noomName', req.body.roomName)
    const subquery = `SELECT id FROM rooms WHERE name='${req.body.roomName}'`;
    const sql = `SELECT * FROM messages WHERE roomID=(${subquery})`;
    db.query(sql, function(err, data) {
        console.log('this is the data we get', data);
        res.json(data);
    });
};

