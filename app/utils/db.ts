import config, { Configs } from '../config/config';
import { Sequelize } from 'sequelize';

const env: string = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof Configs].db;


/**
 * Create connection to MySQL DB
 */
const sequelize: Sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
