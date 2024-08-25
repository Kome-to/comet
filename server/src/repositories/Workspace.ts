import WorkspaceModel from '../models/Workspace';

class UserRepository {
  async getByUser(userId: string, name: string) {
    return WorkspaceModel.findOne({
      where: { userId, name },
    });
  }
}

export default new UserRepository();
