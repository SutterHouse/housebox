const messageDB = require('../database/message.js');


//WEBSOCKET SERVER
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', () => {
    wss.on('message', message => {
        console.log('received message: ', message);
    });
})


//HTTP SERVER
const express = require('express');
const app = express();

app.get('/', express.static('build'));

app.get('/messages', (req, res) => {
    messageDB.find({}).then(result => {
        res.send(result);
    });
})


var port = 3000;
app.listen(port, () => console.log('listening on port', port));