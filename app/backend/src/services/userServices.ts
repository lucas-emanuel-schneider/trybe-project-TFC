import * as bcrypt from 'bcryptjs';
import userModel from '../database/models/User.Model';
import ILogin from '../interfaces/ILogin';
import JwtFunctions from '../auth/jwtFunctions';
import ErrorClass from '../utils/ErrorClass';

export default class UserService {
  constructor(private Jwt: JwtFunctions) { }
  public async login(userLogin: ILogin): Promise<string | unknown> {
    const user = await userModel.findOne({ where: { email: userLogin.email } });
    if (!user) throw new ErrorClass(401, 'Incorrect email or password');
    const passwordValidation = await bcrypt.compareSync(userLogin.password, user.password);
    if (!passwordValidation) throw new ErrorClass(401, 'Incorrect email or password');
    const { password, ...userWithoutPassword } = user;
    const token: string = this.Jwt.createToken(userWithoutPassword);
    return token;
  }

  public async getRole(token: string): Promise<string> {
    const { dataValues: { role } } = await this.Jwt.getToken(token);
    return role;
  }
}
