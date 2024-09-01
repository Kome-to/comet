import cors from 'cors';
import App from './app';
import { API_PREFIX } from './common/constants';
import fs from 'fs';
import routes from './routes';
import path from 'path';

const middleWares = [cors()];

const certificate = {
  cert: fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem')),
  key: fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem')),
};

const app = new App({
  port: parseInt(process.env.APP_PORT) || 4044,
  apiPrefix: API_PREFIX,
  middleWares,
  routes,
  certificate,
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
});

app.listen();
