var db = require('./message.js');

db.insertMany([{
    username: 'Paolo',
    text: 'hello world',
    room: 'looby'
},
{
    username: 'Louis',
    text: 'hello there',
    room: 'looby'
}]).then((result) => {
    return db.find({username: 'victor'});
}).then(result => {
    console.log(result);

    return db.count();
}).then(result => {
    console.log(result);
}) 
