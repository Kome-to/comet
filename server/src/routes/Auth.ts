import express from 'express';
import { validate } from 'express-validation';
import wrapper from '../common/helpers/wrapper';
import AuthController from '../controllers/Auth';
import validators from '../validators/Auth';

const router = express.Router();

router.post('/login', validate(validators.login), wrapper(AuthController.login));

export default router;
