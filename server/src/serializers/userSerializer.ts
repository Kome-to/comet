import { UserAttributes } from '../interfaces/User';

export const userSerializer = (user: UserAttributes) => {
  return {
    id: user.id,
  };
};
