import { Request, Response } from 'express';

class UserController {
  constructor() {}

  public getInfo = (req: Request, res: Response) => {
    return res.status(200).send({ message: 'Ok' });
  };
}

const userController = new UserController();

export default userController;
