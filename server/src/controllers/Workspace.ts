import { Request, Response } from 'express';

import WorkspaceRepository from '../repositories/Workspace';
import WorkspaceServices from '../services/Workspace';
import UserRepository from '../repositories/User';
import BadRequestError from '../common/errors/types/BadRequestError';
import response from '../common/helpers/response';
import withTransaction from '../common/hooks/withTransaction';
import messages from '../common/messages';
import ChannelController from '../controllers/Channel';
import MemberController from '../controllers/Member';
import { WorkspaceCreateParams } from '../interfaces/Workspace';

class WorkspaceController extends WorkspaceServices {
  public create = async (req: Request<{}, {}, WorkspaceCreateParams>, res: Response) => {
    const { name, members, channel } = req.body;
    console.log('🚀 ~ WorkspaceController ~ create= ~ name, members, channel:', name, members, channel);

    const existWorkspace = await WorkspaceRepository.getByUser(req.user.id, name);

    if (existWorkspace) {
      throw new BadRequestError(messages.workspace.exist);
    }

    const existUsers = await UserRepository.getByEmails(members);

    await withTransaction(async (trans) => {
      const workspace = await this.createWorkspace({ name, userId: req.user.id }, trans);
      const createdChannel = await ChannelController.createChannel(
        { workspaceId: workspace.id, name: channel.name, publicKey: channel.publicKey, isPrivate: false },
        trans,
      );
      // const memberCreations = existUsers.map((u) => {
      //   return { userId: u.id, channelId: createdChannel.id, role: 'member', eChannelKey };
      // });
      // await MemberController.createMembers({ userId }, trans);
    });

    return response.success(res);
  };

  public getByUser = async (req: Request, res: Response) => {
    const { user } = req;

    return response.success(res, []);
  };
}

export default new WorkspaceController();
