import * as express from 'express';
import MatchesService from '../services/matchesService';
import MatchController from '../controllers/matches.controller';
import JwtFunctions from '../auth/jwtFunctions';

const jwtValidation = new JwtFunctions();

const matchesService = new MatchesService();

const matchesController = new MatchController(matchesService);

const matchesRouter = express.Router();

matchesRouter.get('/', matchesController.getMatches);

matchesRouter.post('/', jwtValidation.verifyToken, matchesController.createMatch);

matchesRouter.patch('/:id/finish', matchesController.finishMatch);

matchesRouter.patch('/:id', matchesController.updateScore);

export default matchesRouter;
