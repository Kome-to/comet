import express, { Application, Router } from 'express';
import http from 'http';
import https from 'https';
import passport from 'passport';
import Apollo from './apollo';
import { handleCommonHttpError, handleRequestValidationError, handleRouteNotFound, handleServerException } from './common/errors';
import { passportConfiguration } from './common/lib/passport';
interface ExpressApplication {
  port?: number;
  middleWares?: any;
  apiPrefix?: string;
  routes: Router;
  graphqlPath: string;
  certificate: { cert: Buffer; key: Buffer };
}

export default class App {
  private app: Application = express();
  private apollo: Apollo;
  private port: number;
  private graphqlPath: string;
  private httpsServer: https.Server;
  private httpServer: http.Server;

  constructor(appInit: ExpressApplication) {
    this.port = appInit.port;
    this.graphqlPath = appInit.graphqlPath;
    this.httpServer = http.createServer(this.app);
    this.httpsServer = https.createServer(appInit.certificate, this.app);

    this.init(appInit);
  }

  private init(appInit: ExpressApplication) {
    this.middlewares(appInit.middleWares || []);
    this.initRoutes(appInit.apiPrefix, appInit.routes);
    this.initPassport();
    this.handleError();
    this.initApollo();
  }

  private middlewares(middleWares: []) {
    for (const middleware of middleWares) {
      this.app.use(middleware);
    }
  }

  private initRoutes(apiPrefix: string, route: Router) {
    this.app.use(apiPrefix, route);
  }

  private initPassport() {
    passportConfiguration(passport);
    this.app.use(passport.initialize());
  }

  private handleError() {
    this.app.use(handleRouteNotFound);
    this.app.use(handleRequestValidationError);
    this.app.use(handleCommonHttpError);
    this.app.use(handleServerException);
  }

  private initApollo = () => {
    this.apollo = new Apollo(this.graphqlPath, this.httpServer, this.httpsServer);
    this.apollo.start(this.app);
  };

  public listen(): void {
    // this.httpServer.listen(this.port, () => {
    //   console.log('🚀 http: ', `http://localhost:${this.port}`);
    //   console.log('🚀 ws: ', `http://localhost:${this.port}${this.graphqlPath}`);
    // });
    this.httpsServer.listen(this.port, () => {
      console.log('🚀 Server is ready 🚀');

      console.log('[https] ', `https://${process.env.HOST}:${this.port}`);
      console.log('[graphql] ', `https://${process.env.HOST}:${this.port}${this.graphqlPath}`);
      console.log('[wss] ', `wss://${process.env.HOST}:${this.port}${this.graphqlPath}`);
    });
  }
}
