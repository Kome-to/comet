import { NextFunction, Request, Response } from 'express';

/**
 * Catch any unhandled errors or exceptions
 */
export default (callback: (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      return await callback(req, res, next);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        next(error);
      } else if (error) {
        next(new Error(`Unhandled promise rejection: ${JSON.stringify(error)}`));
      } else {
        next(new Error('Unknown Error Occurred'));
      }
    }
  };
};
