import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import ErrorClass from '../utils/ErrorClass';

const errorHandler: ErrorRequestHandler = (
  error: Error & Partial<ErrorClass>,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ErrorClass) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
