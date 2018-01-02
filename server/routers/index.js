//what links client to function you want to do
const express = require('express');
const controllers = require('../controllers/index');

const router = express.Router();

router.get('/rooms', controllers.getRooms);
router.post('/rooms', controllers.addRoom);
router.post('/messages', controllers.getMessages);
router.delete('/rooms', controllers.removeAllRooms);
module.exports = router;