import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '../common/lib/sequelize';
import { UserAttributes } from '../interfaces/User';

class UserModel extends Model<UserAttributes> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare publicKey: string;
  declare password: string;
  declare ePrivateKey: string;
  declare email: string;
  declare isActive: boolean;
  declare createdAt?: string;
  declare updatedAt?: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'last_name',
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'public_key',
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    ePrivateKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'e_private_key',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_active',
    },
  },
  {
    tableName: 'user',
    underscored: true,
    freezeTableName: true,
    sequelize,
  },
);

UserModel.beforeCreate((instance) => {
  instance.id = uuidv4();
});

UserModel.beforeUpdate((instance) => {});

export default UserModel;
