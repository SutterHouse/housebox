const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/housebox');
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'));

var messageSchema = mongoose.Schema({
    id: Number,
    username: String,
    text: String,
    room: String
});

var Message = mongoose.model('Message', messageSchema);

module.exports.insertMany = (messageArray) => {
    var latestId = 0;
    return Message.count({}).then(result => {
        latestId = Number(result);

        var promiseArray = messageArray.map((message, index) => {
            message.id = ++latestId;
            var messageInstance = new Message({...message});
            return messageInstance.save();
        });

        return Promise.all(promiseArray);
    
    }).catch(err => {
        console.error(err);
    });
};

module.exports.find = (searchObj) => {
    return Message.find(searchObj).catch(err => {
        console.error(err);
    });
};

module.exports.count = () => {
    return Message.count({}).catch(err => {
        console.error(err);
    });
};

module.exports.remove = (searchObj) => {
    return Message.remove(searchObj).catch(err => {
        console.error(err);
    });
};