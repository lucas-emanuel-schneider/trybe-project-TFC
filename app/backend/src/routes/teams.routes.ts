import * as express from 'express';
import TeamService from '../services/teamService';
import TeamController from '../controllers/teams.controller';

const teamService = new TeamService();

const teamController = new TeamController(teamService);

const teamRouter = express.Router();

teamRouter.get('/', teamController.getAllTeams);

teamRouter.get('/:id', teamController.getTeamById);

export default teamRouter;
