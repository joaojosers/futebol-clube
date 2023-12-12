import * as express from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = express.Router();

const leaderboardController = new LeaderboardController(new LeaderboardService());

route.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
route.get('/', leaderboardController.getHomeMatches);

export default route;

// route.get(
//     '/leaderboard/home',
//     authMiddleware,

//     (req, res) => controllerLeaderboard.getHomeLeaderboard(req, res),
//   );
