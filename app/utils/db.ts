import config, { Configs } from '../config/config';
import { Sequelize } from 'sequelize';

const env: string = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof Configs].db;


/**
 * Create connection to MysSQL DB
 */
const sequelize: Sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error: Error) => {
    console.error('An error occurred while synchronizing the models:', error);
  });

export default sequelize;
