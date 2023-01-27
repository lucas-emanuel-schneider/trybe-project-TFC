import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import { IBoard } from '../interfaces/IScore';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoardService) { }

  private sortScoreBoard = (teamsHomeInfo: IBoard[]): IBoard[] => {
    const sortedResult = teamsHomeInfo.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return sortedResult;
  };

  public getHomeScoreBoard = async (req: Request, res: Response): Promise<void> => {
    const allScores = await this.leaderBoardService.getHomeTeamsScore();
    const allScoresFiltred = this.sortScoreBoard(allScores);
    res.status(200).json(allScoresFiltred);
  };

  public getAwayScoreBoard = async (req: Request, res: Response): Promise<void> => {
    const allScores = await this.leaderBoardService.getAwayTeamsScore();
    const allScoresFiltred = this.sortScoreBoard(allScores);
    res.status(200).json(allScoresFiltred);
  };

  public getAllTeamsScore = async (req: Request, res: Response): Promise<void> => {
    const allScores = await this.leaderBoardService.getAllTeamsScore();
    const allScoresFiltred = this.sortScoreBoard(allScores);
    res.status(200).json(allScoresFiltred);
  };
}
