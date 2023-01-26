import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) { }
  public getHomeScoreBoard = async (req: Request, res: Response): Promise<void> => {
    const allScores = await this.leaderBoardService.getHomeTeamsScore();
    res.status(200).json(allScores);
  };
}
