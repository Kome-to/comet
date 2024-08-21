import express from 'express';

import { IMAGE_EXTENSIONS, MAX_SIZE_UPLOAD_PHOTO } from '../common/constants';
import wrapper from '../common/helpers/wrapper';
import UserController from '../controllers/User';
import authentication from '../middlewares/authentication';
import fileUpload from '../middlewares/file-upload';

const router = express.Router();

const fileUploadSingle = fileUpload.multerUpload({ limitSize: MAX_SIZE_UPLOAD_PHOTO, extensions: IMAGE_EXTENSIONS }).single('avatar');

router.get('/me', [authentication], [fileUploadSingle], wrapper(UserController.getMe));

export default router;
