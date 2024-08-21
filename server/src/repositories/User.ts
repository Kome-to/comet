import UserModel from '../models/User';

class UserRepository {
  async getById(id: string) {
    return UserModel.findOne({
      where: { id },
    });
  }
}

const userRepository = new UserRepository();

export default userRepository;
