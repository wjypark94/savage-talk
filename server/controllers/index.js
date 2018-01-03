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

exports.addPrivateRoom = function(req, res) {
    console.log('this is req.body', req.body)
    const sql = `INSERT INTO rooms (name) VALUES ('${req.body.name}')`;
    db.query(sql, function(err, data){
        res.send('posted into database');
    })
};


exports.getMessages = function(req, res) {
    console.log('this is roomName', req.body.roomName)
    const subquery = `SELECT id FROM rooms WHERE name='${req.body.roomName}'`;
    const sql = `SELECT * FROM messages WHERE roomID=(${subquery})`;
    db.query(sql, function(err, data) {
        console.log('this is the data we get', data);
        res.json(data);
    });
};

exports.removeAllRooms = function(req, res) {
    const sql = 'DELETE FROM rooms';
    const sqlmessage = 'DELETE FROM messages';
    db.query(sql, function(err, data) {
        db.query(sqlmessage, function(err, data){
            res.send('deleted message from database');
        })
    })
};

exports.removeRoom = function(req, res) {
    console.log('remove room is hitting', req.body.roomName);
    const subquery = `SELECT id from rooms WHERE name='${req.body.roomName}'`;
    const sql = `DELETE from messages WHERE roomID=(${subquery})`;
    const sql2 = `DELETE from rooms where name='${req.body.roomName}'`;
    db.query(sql, function(err, data) {
        db.query(sql2, function(err, data) {
            res.send('deleted from database')
        });
    });
};
