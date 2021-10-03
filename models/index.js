const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const RainCommand = require('./rainCommand');
const RainVo = require('./rainVo');
const nickVo = require('./nickVo');
const bingoCommandVo = require('./bingoCommandVo');
const bingoVo = require('./bingoVo');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.RainVo = RainVo;
RainVo.init(sequelize);
RainVo.associate(db);

db.RainCommand = RainCommand;
RainCommand.init(sequelize);
RainCommand.associate(db);

db.nickVo = nickVo;
nickVo.init(sequelize);
nickVo.associate(db);

db.bingoCommandVo = bingoCommandVo;
bingoCommandVo.init(sequelize);
bingoCommandVo.associate(db);

db.bingoVo = bingoVo;
bingoVo.init(sequelize);
bingoVo.associate(db);

module.exports = db;
