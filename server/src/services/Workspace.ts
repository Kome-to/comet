import { Transaction } from 'sequelize';
import { WorkspaceCreation } from '../interfaces/Workspace';
import WorkspaceModel from '../models/Workspace';

class WorkspaceServices {
  public createWorkspace = async ({ name, userId }: WorkspaceCreation, transaction: Transaction) => {
    return WorkspaceModel.create({ name, userId }, { transaction });
  };
}

export default WorkspaceServices;
