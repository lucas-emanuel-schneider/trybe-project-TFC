import { Request, Response } from 'express';
import teamService from '../services/teamService';

export default class TeamController {
  constructor(private teamsService: teamService) {}
  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    const teams = await this.teamsService.getAllTeams();
    res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const team = await this.teamsService.getTeamById(Number(id));
    res.status(200).json(team);
  };
}
