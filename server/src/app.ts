import express, { Application, Router } from 'express';
import { passportConfiguration } from './common/lib/passport';
import { handleCommonHttpError, handleRequestValidationError, handleRouteNotFound, handleServerException } from './common/errors';
import passport from 'passport';
interface ExpressApplication {
  port?: number;
  middleWares?: any;
  apiPrefix?: string;
  routes: Router;
}

export default class App {
  private app: Application = express();
  private port: number;

  constructor(appInit: ExpressApplication) {
    this.port = appInit.port;
    this.init(appInit);
  }

  private init(appInit: ExpressApplication) {
    this.middlewares(appInit.middleWares || []);
    this.initRoutes(appInit.apiPrefix, appInit.routes);
    this.initPassport();
    this.handleError();
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

  public listen(): void {
    this.app.listen(this.port, () => {
      console.info(`App is listening on port ${this.port}`);
    });
  }
}
