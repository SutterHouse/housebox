var db = require('./mysql.js');

db.sync().then(() => {
    return db.insertMany([{
        username: 'Paolo',
        text: 'hello world',
        room: 'looby'
    },
    {
        username: 'Louis',
        text: 'hello there',
        room: 'looby'
    }]);
}).then(() => {
    return db.find({username: 'Louis'});
}).then(result => {
    console.log(JSON.stringify(result));

    return db.count();
}).then(result => {
    console.log(result);
}) 
