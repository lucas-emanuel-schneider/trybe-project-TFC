import * as express from 'express';
import MatchesService from '../services/matchesService';
import MatchController from '../controllers/matches.controller';

const matchesService = new MatchesService();

const matchesController = new MatchController(matchesService);

const matchesRouter = express.Router();

matchesRouter.get('/', matchesController.getMatches);

export default matchesRouter;
