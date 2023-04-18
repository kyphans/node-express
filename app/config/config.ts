export interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
}

interface Config {
  db: DbConfig;
}

export interface Configs {
  development: Config;
  production: Config;
}

const configs: Configs = {
  development: {
    db: {
      username: 'root',
      password: 'root',
      database: 'node_express',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  },
  production: {
    db: {
      username: 'root',
      password: 'root',
      database: 'node_express',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  },
};

export default configs;
