import { Request, Response } from 'express';
import matchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchService: matchesService) { }
  public getMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAllMatches();
    if (inProgress) {
      const filterMatches = matches.filter((match) => match.inProgress.toString() === inProgress);
      res.status(200).json(filterMatches);
    }
    res.status(200).json(matches);
  };

  public createMatch = async (req: Request, res: Response): Promise<void> => {
    const matchCreated = await this.matchService.createMatch(req.body);
    res.status(201).json(matchCreated);
  };
}
