export interface IMatchToCreate {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}

export default interface IMatch extends IMatchToCreate {
  id: number
  inProgress: boolean;
}
