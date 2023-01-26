// import ErrorClass from '../utils/ErrorClass';
import ITeam from '../interfaces/ITeam';
import matchesModel from '../database/models/Matches.Model';
import teamsModel from '../database/models/Teams.Model';
import { IBoard } from '../interfaces/IScore';

export default class LeaderBoardService {
  private _info: IBoard = {
    name: '',
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
    totalGames: 0,
    totalPoints: 0,
  };

  private getAllMatchesFinished = async (): Promise<matchesModel[]> => {
    const allMatches = await matchesModel.findAll({
      include: [
        { model: teamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: teamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress: false },
    });
    return allMatches;
  };

  private setScoreObjHomeTeams = (matches: matchesModel[], team: ITeam) => {
    const result = matches.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) acc.totalLosses += 1;
      if (curr.awayTeamGoals === curr.homeTeamGoals) acc.totalDraws += 1;
      if (curr.awayTeamGoals < curr.homeTeamGoals) acc.totalVictories += 1;
      acc.goalsOwn += curr.awayTeamGoals;
      acc.goalsFavor += curr.homeTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      acc.totalGames = matches.length;
      acc.totalPoints = (acc.totalVictories * 3) + acc.totalDraws;
      acc.efficiency = +((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2);
      acc.name = team.teamName;
      return acc;
    }, { ...this._info });
    return result;
  };

  private sortScoreBoard = async (teamsHomeInfo: IBoard[]): Promise<IBoard[]> => {
    const sortedResult = teamsHomeInfo.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return sortedResult;
  };

  public getHomeTeamsScore = async (): Promise<IBoard[]> => {
    const matches = await this.getAllMatchesFinished();
    const allTeams = await teamsModel.findAll();
    const teamsHomeInfo = allTeams.map((t) => {
      const matchesFiltred = matches.filter((team) => team.homeTeamId === t.id);
      return this.setScoreObjHomeTeams(matchesFiltred, t);
    });
    const sortedScoreBoard = this.sortScoreBoard(teamsHomeInfo);
    return sortedScoreBoard;
  };
}
