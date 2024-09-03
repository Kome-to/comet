import { PubSub } from 'graphql-subscriptions';
import { WorkspaceCreateParams } from '../../interfaces/Workspace';

class Workspace {
  constructor() {}

  public createWorkspace = (pubsub: PubSub) => async (_: unknown, data: { input: WorkspaceCreateParams }) => {
    const { input } = data;
    pubsub.publish('EVENT_CREATED', { data: input });
    console.log('🚀 ~ Workspace ~ createWorkspace= ~ data:', input);
    return input;
  };
}

export default new Workspace();
