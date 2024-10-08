import { PubSub } from 'graphql-subscriptions';
import Workspace from './functions/Workspace';

export const initResolvers = (pubsub: PubSub) => ({
  Query: {
    chats: () => [],
  },
  Mutation: {
    createWorkspace: Workspace.create(pubsub),
  },
  Subscription: {
    books: {
      subscribe: () => pubsub.asyncIterator(['EVENT_CREATED']),
    },
  },
});
