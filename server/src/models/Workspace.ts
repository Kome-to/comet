import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../common/lib/sequelize';
import { WorkspaceAttributes } from '../interfaces/Workspace';

class WorkspaceModel extends Model<WorkspaceAttributes> {
  declare id: string;
  declare name: string;
  declare userId: string;
}

WorkspaceModel.init(
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: 'workspaces',
    underscored: true,
    freezeTableName: true,
    sequelize,
  },
);

WorkspaceModel.beforeCreate((instance) => {
  instance.id = uuidv4();
});

WorkspaceModel.beforeUpdate((instance) => {});

export default WorkspaceModel;
