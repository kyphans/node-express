const config = require('../config/config');
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env].db;

/**
 * Create connection to MysSQL DB
 */
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

module.exports = sequelize;
