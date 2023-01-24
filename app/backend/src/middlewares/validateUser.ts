import { Request, Response, NextFunction } from 'express';
import ErrorClass from '../utils/ErrorClass';

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const user = req.body;

  if (!user.email || !user.password) throw new ErrorClass(400, 'All fields must be filled');
  next();
};

export default validateUser;
