import { PubSub } from 'graphql-subscriptions';
import { WorkspaceCreateParams } from '../../interfaces/Workspace';
import WorkspaceServices from '../../services/Workspace';
import { SubscriptionEvents } from './../../common/enum';
import withTransaction from '../../common/hooks/withTransaction';
import Channel from '../functions/Channel';
import WorkspaceModel from '../../models/Workspace';

class Workspace extends WorkspaceServices {
  public create = (pubsub: PubSub) => async (_: unknown, data: { input: WorkspaceCreateParams }, context) => {
    const {
      input: { name, id, channels, members },
    } = data;

    const workspaceParams: { name: string; userId: string; id?: string } = { name, userId: context.user.id };
    if (id) {
      workspaceParams.id = id;
    }

    let workspace: WorkspaceModel;
    pubsub.publish(SubscriptionEvents.WORKSPACE_CREATE_EVENT, { data: id });
    withTransaction(async (trans) => {
      workspace = await this.createWorkspace(workspaceParams, trans);

      await Promise.all(
        channels.map((channel) => {
          return Channel.createChannel({ workspaceId: workspace.id, name: '', publicKey: '', isPrivate: false }, trans);
        }),
      );
    });
    return workspace;
  };
}

export default new Workspace();
