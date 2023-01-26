import * as express from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const leaderBoardService = new LeaderBoardService();

const leaderBoardController = new LeaderBoardController(leaderBoardService);

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', leaderBoardController.getHomeScoreBoard);

export default leaderBoardRouter;
