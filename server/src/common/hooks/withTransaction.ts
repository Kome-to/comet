import { Transaction } from 'sequelize/types';

import BadRequestError from '../errors/types/BadRequestError';
import Sequelize from '../lib/Sequelize';
import messages from '../messages';

const withTransaction = async (transactionCallBack: (trans: Transaction) => Promise<any>) => {
  const trans = await Sequelize.transaction();
  try {
    const result = await transactionCallBack(trans);
    await trans.commit();
    return result;
  } catch (error) {
    console.log(error);
    await trans.rollback();
    throw new BadRequestError(messages.httpMessages[400]);
  }
};

export default withTransaction;
