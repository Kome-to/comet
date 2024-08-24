import UserModel from '../models/User';

class UserRepository {
  async getById(id: string) {
    return UserModel.findOne({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return UserModel.findOne({
      where: { email },
    });
  }
}

export default new UserRepository();
