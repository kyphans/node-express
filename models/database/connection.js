const { Sequelize } = require('sequelize');

/**
 * Create connection to MysSQL DB 
 */
const sequelize = new Sequelize('node_express', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
