import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Sex, UserRole } from '../common/enum';
import sequelize from '../common/lib/Sequelize';
import { UserAttributes, UserCreation } from '../interfaces/User';

class UserModel extends Model<UserAttributes | UserCreation> {
  declare id: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
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
