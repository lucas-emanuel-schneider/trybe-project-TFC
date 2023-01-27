// import ErrorClass from '../utils/ErrorClass';
import ITeam from '../interfaces/ITeam';
import matchesModel from '../database/models/Matches.Model';
import teamsModel from '../database/models/Teams.Model';
import { IBoard } from '../interfaces/IScore';
import IMatch from '../interfaces/IMatch';

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

  private getHomeGoals = (cur: IMatch, acc: IBoard) => {
    if (cur.awayTeamGoals > cur.homeTeamGoals) acc.totalLosses += 1;
    if (cur.awayTeamGoals === cur.homeTeamGoals) acc.totalDraws += 1;
    if (cur.awayTeamGoals < cur.homeTeamGoals) acc.totalVictories += 1;
    return acc;
  };

  private getAwayGoals = (cur: IMatch, acc: IBoard) => {
    if (cur.awayTeamGoals < cur.homeTeamGoals) acc.totalLosses += 1;
    if (cur.awayTeamGoals === cur.homeTeamGoals) acc.totalDraws += 1;
    if (cur.awayTeamGoals > cur.homeTeamGoals) acc.totalVictories += 1;
    return acc;
  };

  private getGoals = (cur: IMatch, isHome: boolean | undefined, acc: IBoard) => {
    let result = { ...acc };
    if (isHome) {
      result = this.getHomeGoals(cur, acc);
    }
    if (!isHome) {
      result = this.getAwayGoals(cur, acc);
    }
    return result;
  };

  private setScoreObj = (matches: matchesModel[], team: ITeam, isHome: boolean) => {
    const result = matches.reduce((acc, cur) => {
      const { totalDraws, totalLosses, totalVictories } = this.getGoals(cur, isHome, acc);
      acc.totalDraws = totalDraws;
      acc.totalLosses = totalLosses;
      acc.totalVictories = totalVictories;
      acc.goalsOwn += isHome ? cur.awayTeamGoals : cur.homeTeamGoals;
      acc.goalsFavor += isHome ? cur.homeTeamGoals : cur.awayTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
      acc.totalGames = matches.length;
      acc.totalPoints = (acc.totalVictories * 3) + acc.totalDraws;
      acc.efficiency = +((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2);
      acc.name = team.teamName;
      return acc;
    }, { ...this._info });
    return result;
  };

  public getAwayTeamsScore = async (): Promise<IBoard[]> => {
    const matches = await this.getAllMatchesFinished();
    const allTeams = await teamsModel.findAll();
    const teamsAwayInfo = allTeams.map((t) => {
      const matchesFiltred = matches.filter((team) => team.awayTeamId === t.id);
      return this.setScoreObj(matchesFiltred, t, false);
    });
    return teamsAwayInfo;
  };

  public getHomeTeamsScore = async (): Promise<IBoard[]> => {
    const matches = await this.getAllMatchesFinished();
    const allTeams = await teamsModel.findAll();
    const teamsHomeInfo = allTeams.map((t) => {
      const matchesFiltred = matches.filter((team) => team.homeTeamId === t.id);
      return this.setScoreObj(matchesFiltred, t, true);
    });
    return teamsHomeInfo;
  };

  public getAllTeamsScore = async (): Promise<IBoard[]> => {
    const home = await this.getHomeTeamsScore();
    const away = await this.getAwayTeamsScore();
    return home.map((team, i) => ({
      name: away[i].name,
      totalPoints: team.totalPoints + away[i].totalPoints,
      totalGames: team.totalGames + away[i].totalGames,
      totalVictories: team.totalVictories + away[i].totalVictories,
      totalDraws: team.totalDraws + away[i].totalDraws,
      totalLosses: team.totalLosses + away[i].totalLosses,
      goalsFavor: team.goalsFavor + away[i].goalsFavor,
      goalsOwn: team.goalsOwn + away[i].goalsOwn,
      goalsBalance: team.goalsBalance + away[i].goalsBalance,
      get efficiency() {
        return +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
      } }));
  };
}
