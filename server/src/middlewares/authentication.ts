import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import UnauthorizedError from '../common/errors/types/UnauthorizedError';
import messages from '../common/messages';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', {}, async (error, data, info) => {
    if (error) {
      return next(error);
    }

    if (data && data.user) {
      req.user = data.user.dataValues;
      res.locals = res.locals || {};
      res.locals.user = data.user;
      return next();
    }

    return next(new UnauthorizedError(messages.auth.invalidToken));
  })(req, res, next);
};
