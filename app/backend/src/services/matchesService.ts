import ErrorClass from '../utils/ErrorClass';
import matchesModel from '../database/models/Matches.Model';
import teamsModel from '../database/models/Teams.Model';
import { IMatchToCreate } from '../interfaces/IMatch';

export default class MatchesService {
  public getAllMatches = async (): Promise<matchesModel[]> => {
    const allMatches = await matchesModel.findAll({
      include: [
        { model: teamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: teamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  public createMatch = async (match: IMatchToCreate): Promise<matchesModel> => {
    const { homeTeamId, awayTeamId } = match;
    this.validateTeamsToCreate(homeTeamId, awayTeamId);
    const createdMatch = await matchesModel.create({
      ...match,
      inProgress: true,
    });
    return createdMatch;
  };

  private validateTeamsToCreate = async (homeTeamId: number, awayTeamId: number): Promise<void> => {
    if (homeTeamId === awayTeamId) {
      throw new ErrorClass(422, 'It is not possible to create a match with two equal teams');
    }
    const validateHomeTeam = await teamsModel.findByPk(homeTeamId);
    const validateAwayTeam = await teamsModel.findByPk(awayTeamId);
    if (!validateHomeTeam || !validateAwayTeam) {
      throw new ErrorClass(404, 'There is no team with such id!');
    }
  };
}
