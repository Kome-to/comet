import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../common/lib/sequelize';
import { ChannelAttributes, ChannelCreation } from '../interfaces/Channel';

class ChannelModel extends Model<ChannelAttributes, ChannelCreation> {
  declare id: string;
  declare workspaceId: string;
  declare name: string;
  declare isPrivate: boolean;
  declare publicKey: string;
}

ChannelModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    workspaceId: {
      type: DataTypes.UUID,
      references: {
        model: 'workspaces',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'workspace_id',
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'e_channel_key',
    },
  },
  {
    tableName: 'channels',
    underscored: true,
    freezeTableName: true,
    sequelize,
  },
);

ChannelModel.beforeCreate((instance) => {
  instance.id = uuidv4();
});

ChannelModel.beforeUpdate((instance) => {});

export default ChannelModel;
