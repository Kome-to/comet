import express from 'express';

import { IMAGE_EXTENSIONS, MAX_SIZE_UPLOAD_PHOTO } from '../common/constants';
import wrapper from '../common/helpers/wrapper';
import UserController from '../controllers/User';
import authentication from '../middlewares/authentication';
import fileUpload from '../middlewares/file-upload';
import { validate } from 'express-validation';
import validators from '../validators/User';

const router = express.Router();

const fileUploadSingle = fileUpload.multerUpload({ limitSize: MAX_SIZE_UPLOAD_PHOTO, extensions: IMAGE_EXTENSIONS }).single('avatar');

router.get('/me', [authentication], wrapper(UserController.getMe));
router.get('/', validate(validators.getUser), wrapper(UserController.getUser));

export default router;
