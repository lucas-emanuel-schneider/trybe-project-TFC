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

export interface IMatchTest {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}
