import { Request, Response } from 'express';
import UserRepository from '../repositories/User';
import UserServices from '../services/User';
import response from '../common/helpers/response';
import { GetUserQuery, UserAttributes } from '../interfaces/User';

class UserController extends UserServices {
  public getMe = async (req: Request, res: Response) => {
    const existUser = await UserRepository.getById(req.user.id);

    return response.success(res, existUser);
  };

  public getUser = async (req: Request<{}, {}, {}, GetUserQuery>, res: Response) => {
    const { email, id } = req.query;
    let user: UserAttributes | null;
    if (id) {
      user = await UserRepository.getById(req.user.id);
    } else if (email) {
      user = await UserRepository.getByEmail(email);
    }

    if (!user) {
      return response.success(res, null);
    }
    const { publicKey, firstName, lastName, email: userEmail } = user;
    return response.success(res, { email: userEmail, publicKey, firstName, lastName });
  };
}

export default new UserController();
