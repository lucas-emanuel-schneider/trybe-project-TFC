// import ErrorClass from '../utils/ErrorClass';
// import matchesModel from '../database/models/Matches.Model';
// import teamsModel from '../database/models/Teams.Model';
// import { IMatchToCreate } from '../interfaces/IMatch';
// import IScore from '../interfaces/IScore';

// export default class leaderBoardService {
//   private getAllMatchesInProgress = async (): Promise<matchesModel[]> => {
//     const allMatches = await matchesModel.findAll({
//       include: [
//         { model: teamsModel, as: 'homeTeam', attributes: ['teamName'] },
//         { model: teamsModel, as: 'awayTeam', attributes: ['teamName'] },
//       ],
//     });
//     return allMatches.filter((match) => !match.inProgress);
//   };
// }
