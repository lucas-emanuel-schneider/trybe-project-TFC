import * as jwt from 'jsonwebtoken';
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

  public verifyToken = (authorization: string) => {
    try {
      const payload = jwt.verify(authorization, secret);
      return payload as jwt.JwtPayload;
    } catch (error) {
      throw new ErrorClass(401, 'Expired or invalid token');
    }
  };

  // public decodeToken = (token: string): IToken => {
  //   const tokenDecoded = jwt.decode(token) as IToken;
  //   if (!tokenDecoded) throw new ErrorClass(401, 'Token must be a valid token');
  //   return tokenDecoded;
  // };
}
