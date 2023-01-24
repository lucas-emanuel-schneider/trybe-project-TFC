import matchesModel from '../database/models/Matches.Model';
import teamsModel from '../database/models/Teams.Model';

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
}
