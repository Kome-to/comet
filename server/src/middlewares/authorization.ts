import { NextFunction, Request, Response } from 'express';

export default function permit(...permittedRoles: any[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}

const x = () => {
  return 0;
};
