import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, Default, DeletedAt, NotNull, PrimaryKey, Table, Unique } from '@sequelize/core/decorators-legacy';
import dayjs from 'dayjs';

@Table({
  tableName: 'users',
  defaultScope: { attributes: { exclude: ['password'] } },
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  @Unique
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare lastName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  set password(password: string) {
    this.setDataValue('password', Bun.password.hashSync(password, { algorithm: 'bcrypt', cost: 12 }));
  }

  @Attribute(DataTypes.STRING)
  @Unique
  declare avatar: string | null;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  @NotNull
  declare failedLoginAttempts: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  @Default(dayjs().toDate())
  declare lastActive: Date | null;

  @Attribute(DataTypes.DATE)
  declare verifiedAt: Date | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: Date | null;
}
