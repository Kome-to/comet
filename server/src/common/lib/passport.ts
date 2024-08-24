import * as jwt from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import passportJWT from 'passport-jwt';

import env from '../../../config/env';
import { UserAttributes } from '../../interfaces/User';
import UserRepository from '../../repositories/User';
import ForbiddenError from '../errors/types/ForbiddenError';

export interface JWTPayload {
  sub: string;
  iss: string;
  email: string;
}

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

export function passportConfiguration(passport: PassportStatic) {
  const opts: passportJWT.StrategyOptions = {
    secretOrKey: env.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  };

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, cb) => {
      const user = await UserRepository.getById(jwtPayload.id);
      if (user) {
        return cb(null, { user });
      }
      return cb(new ForbiddenError());
    }),
  );
}

export const generateToken = (user: UserAttributes) => {
  return jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};
