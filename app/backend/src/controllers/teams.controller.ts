import { Request, Response } from 'express';
import teamService from '../services/teamService';

export default class UserController {
  constructor(private userService: teamService) {}
  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.userService.getAllTeams();
    res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = await this.userService.getTeamById(Number(id));
    res.status(200).json(team);
  };
}
