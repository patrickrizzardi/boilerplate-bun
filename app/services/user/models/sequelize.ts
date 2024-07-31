import Sequelize, { importModels } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

if (!Bun.env.DATABASE_HOST) throw new Error('DATABASE_HOST not set');
if (!Bun.env.DATABASE_NAME) throw new Error('DATABASE_NAME not set');
if (!Bun.env.DATABASE_PASSWORD) throw new Error('DATABASE_PASSWORD not set');
if (!Bun.env.DATABASE_USER) throw new Error('DATABASE_USERNAME not set');
if (!Bun.env.DATABASE_PORT) throw new Error('DATABASE_PORT not set');

export const userDatabase = new Sequelize({
  dialect: MySqlDialect,
  host: Bun.env.DATABASE_HOST,
  port: Number(Bun.env.DATABASE_PORT),
  user: Bun.env.DATABASE_USER,
  password: Bun.env.DATABASE_PASSWORD,
  database: Bun.env.DATABASE_NAME,
  logging: false,

  /**
   * It is important to make sure the index file (this file) does not contain the
   * word "model" in it. Otherwise, the importModels function will import this file
   * and cause an error.
   */
  models: await importModels(`${import.meta.dir}/*.model.ts`),
  /**
   * https://sequelize.org/docs/v7/other-topics/connection-pool/#pool-configuration
   */
  pool: {
    max: 10,
    min: 5,
    idle: 10000,
  },
});
