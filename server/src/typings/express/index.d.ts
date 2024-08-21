/* eslint-disable */
declare namespace Express {
  interface User {
    id: string;
  }

  export interface Request {
    user?: User;
  }
}
