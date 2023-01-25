import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { IUserWithoutPassword } from '../interfaces/IUser';
// import IToken from '../interfaces/IToken';
import ErrorClass from '../utils/ErrorClass';

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

export default class JwtFunctions {
  public createToken = (userWithoutPassword: IUserWithoutPassword): string => {
    const token = jwt.sign({ ...userWithoutPassword }, secret as jwt.Secret, jwtConfig);
    return token;
  };

  public verifyToken = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void | Response => {
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorClass(401, 'Token not found');
    const payload = jwt.verify(authorization, secret);
    if (!payload) throw new ErrorClass(401, 'Token must be a valid token');
    next();
  };

  public getToken = (token: string): jwt.JwtPayload => {
    const tokenDecoded = jwt.decode(token) as jwt.JwtPayload;
    if (!tokenDecoded) throw new ErrorClass(401, 'Token must be a valid token');
    return tokenDecoded;
  };
}
