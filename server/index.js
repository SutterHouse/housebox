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
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {
    client.on('message', message => {
        console.log('received message: ', message);
        messageDB.insertMany([JSON.parse(message)]).then(() => {
            io.emit('message', message);
        })
    });
});


var port = process.env.PORT || 3001;
server.listen(port, () => console.log('listening on port', port));