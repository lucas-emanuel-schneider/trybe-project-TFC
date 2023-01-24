import { Request, Response } from 'express';
import UserService from '../services/userServices';

export default class UserController {
  constructor(private userService: UserService) {}
  public login = async (req: Request, res: Response): Promise<void> => {
    const token = await this.userService.login(req.body);
    res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response): Promise<void> => {
    const { authorization: token } = req.headers;
    const role = await this.userService.getRole(token as string);
    res.status(200).json({ role });
  };
}
