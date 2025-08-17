import type { Migration } from '@database/umzug/migrate.js';
import type Sequelize from '@sequelize/core';
import { DataTypes } from '@sequelize/core';


export const up: Migration = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.queryInterface.createTable('users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export const down = async ({ context: sequelize }: { context: Sequelize }): Promise<void> => {
  await sequelize.queryInterface.dropTable('users');
};
