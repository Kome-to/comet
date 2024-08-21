import { Request, Response } from 'express';
import { LoginParams, SignUpParams } from '../interfaces/Auth';
import AuthServices from '../services/Auth';

class AuthController extends AuthServices {
  public login = async (req: Request<{}, {}, LoginParams>, res: Response) => {};

  public signUp = async (req: Request<{}, {}, SignUpParams>, res: Response) => {};
}

export default new AuthController();
