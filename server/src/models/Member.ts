import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../common/lib/sequelize';
import { MemberAttributes, MemberCreation } from '../interfaces/Member';

class MemberModel extends Model<MemberAttributes, MemberCreation> {
  declare id: string;
  declare channelId: string;
  declare userId: string;
  declare role: string;
  declare eChannelKey: string;
}

MemberModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'user_id',
    },
    channelId: {
      type: DataTypes.UUID,
      references: {
        model: 'channels',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'channel_id',
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    eChannelKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'e_channel_key',
    },
  },
  {
    tableName: 'members',
    underscored: true,
    freezeTableName: true,
    sequelize,
  },
);

MemberModel.beforeCreate((instance) => {
  instance.id = uuidv4();
});

MemberModel.beforeUpdate((instance) => {});

export default MemberModel;
