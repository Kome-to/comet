import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import express, { Application } from 'express';
import { readFileSync } from 'fs';
import { GraphQLError, GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import gql from 'graphql-tag';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import https from 'https';
import p from 'path';
import { WebSocketServer } from 'ws';
import { initResolvers } from './graphql/resolvers';
import authentication from './middlewares/authentication';
import httpStatus from 'http-status';

class Apollo {
  private pubsub = new PubSub();
  private apollo: ApolloServer;
  private schema: GraphQLSchema;
  private httpsServer: https.Server;
  private httpServer: http.Server;
  private path: string;

  constructor(path: string, httpServer: http.Server, httpsServer: https.Server) {
    this.httpServer = httpServer;
    this.httpsServer = httpsServer;
    this.path = path;
    this.initSchema();
    this.init();
  }

  private init = async () => {
    this.initServer(this.httpServer);
    this.initServer(this.httpsServer);
  };

  private initSchema = () => {
    const typeDefs = gql(
      readFileSync(p.resolve(__dirname, './graphql/schema.graphql'), {
        encoding: 'utf-8',
      }),
    );
    const resolvers = initResolvers(this.pubsub);

    this.schema = makeExecutableSchema({ typeDefs, resolvers });
  };

  private initServer = (server: http.Server | https.Server) => {
    const wsServer = new WebSocketServer({
      server,
      path: this.path,
    });
    const serverCleanup = useServer({ schema: this.schema }, wsServer);
    this.apollo = new ApolloServer({
      schema: this.schema,
      plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer: server }),

        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });
  };

  public start = async (app: Application) => {
    await this.apollo.start();
    app.use(
      this.path,
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(this.apollo, {
        context: async ({ req, res }) => {
          const promise = (): Promise<any> => {
            return new Promise((resolve) => {
              authentication(req, res, resolve);
            });
          };
          const response = await promise();

          if (response) {
            throw new GraphQLError(response.message, {
              extensions: {
                code: response.name,
                http: { status: response.statusCode },
              },
            });
          }

          if (!req.user) {
            throw new GraphQLError('User is not found', {
              extensions: {
                code: 'UserNotFound',
                http: { status: httpStatus[404] },
              },
            });
          }

          return { user: req.user };
        },
      }),
    );
    //
  };
}

export default Apollo;
