import { Router } from 'express';
import userController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/info', userController.getInfo);

export default userRouter;
