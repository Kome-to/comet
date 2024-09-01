import { PubSub } from 'graphql-subscriptions';

export const initResolvers = (pubsub: PubSub) => ({
  Query: {
    chats: () => [],
  },
  Mutation: {
    addBook: (_, book) => {
      pubsub.publish('EVENT_CREATED', { book: book });
      return book;
    },
  },
  Subscription: {
    books: {
      subscribe: () => pubsub.asyncIterator(['EVENT_CREATED']),
    },
  },
});
