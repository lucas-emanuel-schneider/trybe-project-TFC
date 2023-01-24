import teamsModel from '../database/models/Teams.Model';
import ITeam from '../interfaces/ITeam';

export default class Teams {
  public getAllTeams = async (): Promise<ITeam[]> => {
    const allTeams = await teamsModel.findAll();
    return allTeams;
  };

  public getTeamById = async (id: number): Promise<ITeam> => {
    const team = await teamsModel.findByPk(id);
    return team as ITeam;
  };
}
