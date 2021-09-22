const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const RainCommand = require('./rainCommand');
const Rain = require('./rain');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.Rain = Rain;
Rain.init(sequelize);
Rain.associate(db);

db.RainCommand = RainCommand;
RainCommand.init(sequelize);
RainCommand.associate(db);

module.exports = db;
