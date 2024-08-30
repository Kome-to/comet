import { Transaction } from 'sequelize';
import { MemberCreation } from '../interfaces/Member';
import MemberModel from '../models/Member';

export default class MemberServices {
  public createMember = async ({ channelId, userId, role, eChannelKey }: MemberCreation, transaction: Transaction) => {
    return MemberModel.create({ channelId, userId, role, eChannelKey }, { transaction });
  };

  public createMembers = (members: MemberCreation[], transaction: Transaction) => {
    return MemberModel.bulkCreate(members, { transaction });
  };
}
