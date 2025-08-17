/* eslint-disable max-classes-per-file */
import fs from 'fs';
import path from 'path';

import type Sequelize from '@sequelize/core';
import type { CommandLineParserOptions, MigrationFn, Promisable } from 'umzug';
import { SequelizeStorage, Umzug, UmzugCLI } from 'umzug';
import { sequelize } from '@database/models/index.js';


class MyUmzugCLI extends UmzugCLI {
  override async execute(): Promise<boolean> {
    await super.executeWithoutErrorHandlingAsync();
    return true;
  }
}

class MyUmzug extends Umzug {
  getCLI(options?: CommandLineParserOptions): MyUmzugCLI {
    return new MyUmzugCLI(this, options);
  }
}

console.log(path.join(import.meta.dirname, 'migrationTemplate.ts'));

export const migrator = new MyUmzug({
  migrations: { glob: path.join(import.meta.dirname, '../migrations/*.ts') },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
  create: {
    template: (filepath): Promisable<Array<[string, string]>> => [
      [filepath, fs.readFileSync(path.join(import.meta.dirname, 'migrationTemplate.ts')).toString()],
    ],
    folder: path.join(import.meta.dirname, '../migrations'),
  },
});

export type Migration = MigrationFn<Sequelize>;
try {
  await migrator.runAsCLI();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
