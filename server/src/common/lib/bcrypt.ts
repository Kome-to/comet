import bcrypt from 'bcrypt';
import env from '../../../config/env';

export const hashPassword = async (password: string) => {
  const saltRounds = Number(env.salt) || 10;
  return bcrypt.hashSync(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
