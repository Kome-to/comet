import express from 'express';
import { validate } from 'express-validation';
import wrapper from '../common/helpers/wrapper';
import WorkspaceController from '../controllers/Workspace';
import validators from '../validators/Workspace';
import authentication from '../middlewares/authentication';

const router = express.Router();

router.post('/', [authentication], validate(validators.create), wrapper(WorkspaceController.create));

export default router;
