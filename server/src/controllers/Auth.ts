import { Request, Response } from 'express';
import httpStatus from 'http-status';
import NotFoundError from '../common/errors/types/NotFoundError';
import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import response from '../common/helpers/response';
import { hashPassword, verifyPassword } from '../common/lib/bcrypt';
import { generateToken } from '../common/lib/passport';
import messages from '../common/messages';
import { LoginParams, SignUpParams } from '../interfaces/Auth';
import UserRepository from '../repositories/User';
import AuthServices from '../services/Auth';
class AuthController extends AuthServices {
  public login = async (req: Request<{}, {}, LoginParams>, res: Response) => {
    const { email, password } = req.body;

    const existUser = await UserRepository.getByEmail(email);

    if (!existUser) {
      throw new NotFoundError(messages.user.notFound);
    }
    console.log('🚀 ~ AuthController ~ login= ~ existUser:', existUser);

    const isMatch = await verifyPassword(password, existUser.password);

    if (!isMatch) {
      throw new UnauthorizedError(messages.user.passwordIncorrect);
    }

    const token = generateToken(existUser);

    return response.success(res, { token, user: existUser });
  };

  public signUp = async (req: Request<{}, {}, SignUpParams>, res: Response) => {
    const { email, password, firstName, lastName, publicKey, ePrivateKey } = req.body;
    const existUser = await UserRepository.getByEmail(email);

    if (existUser) {
      return response.error(res, httpStatus.BAD_REQUEST, messages.user.exist);
    }

    const hashedPassword = await hashPassword(password);

    await this.createUser({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      publicKey,
      ePrivateKey,
    });

    return response.success(res);
  };
}

export default new AuthController();
