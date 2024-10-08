import express from 'express';
import { validate } from 'express-validation';
import wrapper from '../common/helpers/wrapper';
import AuthController from '../controllers/Auth';
import validators from '../validators/Auth';

const router = express.Router();

router.post('/sign-up', validate(validators.signUp), wrapper(AuthController.signUp));
router.post('/sign-in', validate(validators.login), wrapper(AuthController.signIn));

export default router;
