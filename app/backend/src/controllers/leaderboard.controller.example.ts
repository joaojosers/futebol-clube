// import { Request, Response } from 'express';
// import LeaderboardService from '../services/LeaderboardService';

// class LeaderboardController {
//   constructor(private _leaderBoardService = new LeaderboardService()) {}

//   static async getAllTeams(_req: Request, res: Response) {
//     const allTeams = await LeaderboardService.getAllTeams();
//     return res.status(200).json(allTeams);
//   }

//   static async getHomeTeams(_req: Request, res: Response) {
//     const teamsHome = await LeaderboardService.getHomeTeams();
//     return res.status(200).json(teamsHome);
//   }

//   static async getAwayTeams(_req: Request, res: Response) {
//     const teamsAway = await LeaderboardService.getAwayTeams();
//     return res.status(200).json(teamsAway);
//   }
// }

// export default LeaderboardController;
