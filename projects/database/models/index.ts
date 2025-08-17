import Sequelize, { importModels } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

if (!process.env.DATABASE_NAME) throw new Error('DATABASE_NAME not set');
if (!process.env.DATABASE_PASSWORD) throw new Error('DATABASE_PASSWORD not set');
if (!process.env.DATABASE_USER) throw new Error('DATABASE_USER not set');
if (!process.env.DATABASE_HOST) throw new Error('DATABASE_HOST not set');
if (!process.env.DATABASE_PORT) throw new Error('DATABASE_PORT not set');

export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,

  /**
   * It is important to make sure the index file (this file) does not contain the
   * word "model" in it. Otherwise, the importModels function will import this file
   * and cause an error.
   */
  models: await importModels(`${import.meta.dirname}/*.model.ts`),
  /**
   * https://sequelize.org/docs/v7/other-topics/connection-pool/#pool-configuration
   */
  pool: {
    max: 10,
    min: 5,
    idle: 10000,
  },
});
