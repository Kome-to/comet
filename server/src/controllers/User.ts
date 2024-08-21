import { Request, Response } from 'express';

import UserServices from '../services/User';

class UserController extends UserServices {
  public getMe = async (req: Request, res: Response) => {};
}

export default new UserController();
