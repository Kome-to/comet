import { Request } from 'express';
import multer from 'multer';
import path from 'path';

import env from '../../config/env';
import BadRequestError from '../common/errors/types/BadRequestError';
import fileHelper from '../common/helpers/file';
import messages from '../common/messages';

const storage = (storageFolder: string) => {
  return multer.diskStorage({
    destination: (req: Request, _file, cb) => {
      const relativePath = `${storageFolder}/${req.user.id}`;
      fileHelper.createFolderIfNotExists(relativePath);
      cb(null, `${process.cwd()}/${relativePath}`);
    },
    filename: (req, file, cb) => {
      const fileName = `${new Date().getTime()}${`${Math.random()}`.slice(-3)}${path.extname(file.originalname)}`;
      req.body.fileName = fileName;
      cb(null, fileName);
    },
  });
};

const multerUpload = (config: { limitSize: number; extensions: string[] }) => {
  return multer({
    storage: storage(env.assetsPath),
    fileFilter: (_req: Request, file, callback) => {
      if (!config.extensions.includes(path.extname(file.originalname).toLocaleLowerCase())) {
        return callback(new BadRequestError(messages.upload.fileAvatarExtensionNotAllow));
      }
      callback(null, true);
    },
    limits: { fileSize: config.limitSize },
  });
};

export default {
  storage,
  multerUpload,
};
