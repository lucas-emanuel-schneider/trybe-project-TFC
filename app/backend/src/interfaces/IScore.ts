export default interface IScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IBoard {
  name: string,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
  totalGames: number,
  totalPoints: number,
}
