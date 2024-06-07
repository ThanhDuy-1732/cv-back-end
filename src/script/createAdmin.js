/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
const prompt = require('prompt');
const typeorm = require('typeorm');

require('dotenv').config();

const PostgresDataSource = new typeorm.DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

prompt.start();

prompt.get(['username', 'password'], function (err, result) {
  PostgresDataSource.initialize()
    .then(async () => {
      const passwordSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(result.password, passwordSalt);

      PostgresDataSource.manager.transaction(async (manager) => {
        manager.query(
          `INSERT INTO users (username, password, type, state) VALUES ('${result.username}', '${hashedPassword}', 'system', 'active');`,
        );
      });
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
});
