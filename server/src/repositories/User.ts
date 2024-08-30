import { Op } from 'sequelize';
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

  async getByEmails(emails: string[]) {
    return UserModel.findAll({
      where: {
        email: {
          [Op.in]: emails,
        },
      },
    });
  }
}

export default new UserRepository();
