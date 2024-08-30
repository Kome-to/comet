import { Transaction } from 'sequelize';
import { ChannelCreation } from '../interfaces/Channel';
import ChannelModel from '../models/Channel';

class ChannelServices {
  public createChannel = async ({ workspaceId, name, isPrivate, publicKey }: ChannelCreation, transaction: Transaction) => {
    return ChannelModel.create({ workspaceId, name, isPrivate, publicKey }, { transaction });
  };
}

export default ChannelServices;
