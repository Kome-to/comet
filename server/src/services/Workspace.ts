import { Transaction } from 'sequelize';
import { WorkspaceAttributes, WorkspaceCreation } from '../interfaces/Workspace';
import WorkspaceModel from '../models/Workspace';

class WorkspaceServices {
  public createWorkspace = async (params: WorkspaceAttributes | WorkspaceCreation, transaction: Transaction) => {
    return WorkspaceModel.create(params, { transaction });
  };
}

export default WorkspaceServices;
