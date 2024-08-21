import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';

import response from '../helpers/response';

import BadRequestError from './types/BadRequestError';
import ConflictError from './types/ConflictError';
import ForbiddenError from './types/ForbiddenError';
import HttpError from './types/HttpError';
import InternalServerError from './types/InternalServerError';
import NotFoundError from './types/NotFoundError';
import UnauthorizedError from './types/UnauthorizedError';
import UnprocessableEntityError from './types/UnprocessableEntityError';

/**
 * Identify common API http errors and their default error messages
 */
export const errors = {
  BadRequestError,
  ConflictError,
  Error,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError,
};

export const isValidationError = (candidate: unknown): candidate is ValidationError => {
  return (candidate as ValidationError).details !== undefined;
};

/**
 * MiddleWares and functionality to handle errors
 */

export const handleRouteNotFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new NotFoundError('Method does not exist');
  next(error);
};

export const handleRequestValidationError = (
  error: ValidationError,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response<unknown, Record<string, unknown>> | void => {
  if (error instanceof ValidationError) {
    let message = '';
    if (error.details.body) {
      message = `${error.details.body[0].message.replace(/(")/g, '').split('.')[0]}.`;
    } else if (error.details.query) {
      message = `${error.details.query[0].message.replace(/(")/g, '').split('.')[0]}.`;
    }
    return response.error(res, error.statusCode, message);
  }
  return next(error);
};

export const handleCommonHttpError = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response<unknown, Record<string, unknown>> | void => {
  if (error instanceof HttpError) {
    return response.error(res, error.statusCode, error.message);
  }
  return next(error);
};

export const handleServerException = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response<unknown, Record<string, unknown>> | void => {
  response.error(res);
};
