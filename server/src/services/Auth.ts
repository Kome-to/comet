import { Transaction } from 'sequelize';
import { SignUpParams } from '../interfaces/Auth';
import UserModel from '../models/User';

export default class AuthServices {
  public createUser = async (
    { email, firstName, lastName, publicKey, password, ePrivateKey }: SignUpParams,
    transaction: Transaction,
  ): Promise<UserModel> => {
    return UserModel.create(
      {
        email,
        firstName,
        lastName,
        publicKey,
        password,
        ePrivateKey,
        isActive: false,
      },
      { transaction },
    );
  };
}
