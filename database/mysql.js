const Promise = require('bluebird');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('housebox', 'root', 'mrsanders', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate().then(() => {
  console.log('connected to database');
}).catch(err => {
  console.error('unable to connect to database', err);
});

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  text : {
    type: Sequelize.STRING
  },
  room: {
    type: Sequelize.STRING
  }
});

module.exports.sync = () => {
  return Message.sync();
}

module.exports.insertMany = (messageArray) => {
  var promises = messageArray.map((value) => {
    return Message.create(value);
  });

  return Promise.all(promises).catch(err => {
    console.error(err);
  });
};

module.exports.find = (searchObj) => {
  return Message.findAll({
    where: searchObj
  }).catch(err => {
    console.log(err);
  });
};

module.exports.count = () => {
  return Message.count().catch(err => {
    console.error(err);
  });
}

module.exports.remove = (searchObj) => {
  return Message.destroy({
    where: searchObj
  }).catch(err => {
    console.error(err);
  });
};