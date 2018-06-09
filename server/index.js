const messageDB = require('../database/message.js');


//EXPRESS APP
const express = require('express');
const app = express();

app.get('/messages', (req, res) => {
    messageDB.find({}).then(result => {
        res.send(result);
    });
})

app.use(express.static('build'));


//WEBSOCKET APP
const server = require('http').createServer();

//mount websocket app on http server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });

//mount express app on http server
server.on('request', app);

wss.on('connection', (ws) => {
    ws.on('message', message => {
        console.log('received message: ', message);
    });
    ws.send('your websocket server is here');
})

var port = process.env.PORT || 3001;
server.listen(port, () => console.log('listening on port', port));