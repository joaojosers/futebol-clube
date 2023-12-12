// leaderboard.controller.ts
import { Request, Response } from 'express';
// import TeamService from '../services/team.service';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) {}

  public async getHomeLeaderboard(req: Request, res: Response) {
    try {
      const homeTeamStats = await this._leaderboardService.getHomeTeamStats();
      res.status(200).json(homeTeamStats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async getHomeMatches(req: Request, res: Response) {
    try {
      // const teamName = req.query.teamName as string;
      const homeMatches = await this._leaderboardService.getHomeMatches;
      res.status(200).json(homeMatches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

/* */

// import { Request, Response } from 'express';
// import LeaderboardService from '../services/leaderboard.service';

// export default class LeaderboardController {
//   constructor(private _leaderboardService = new LeaderboardService()) {}

//   public async getHomeLeaderboard(req: Request, res: Response) {
//     try {
//       const homeTeamStats = await this._leaderboardService.getHomeTeamStats();
//       res.status(200).json(homeTeamStats);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }

//   // Método adicionado diretamente ao controller
//   public async getHomeMatches(req: Request, res: Response) {
//     try {
//       // Lógica para obter partidas em casa (home
//       const homeMatches = await this
//         ._leaderboardService.getHomeMatches(req.query.teamName as string);
//       res.status(200).json(homeMatches);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }

// leaderboard.controller.ts

// import { Request, Response } from 'express';
// import LeaderboardService from '../services/leaderboard.service';

// export default class LeaderboardController {
//   constructor(private _leaderboardService = new LeaderboardService()) {}

//   public async getHomeLeaderboard(req: Request, res: Response) {
//     try {
//       const homeTeamStats = await this._leaderboardService.getHomeTeamStats();
//       res.status(200).json(homeTeamStats);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }

// leaderboard.controller.ts

// import { Request, Response } from 'express';
// import { LeaderboardService } from '../services/leaderboard.service';
// import { TeamStats } from '../types/TeamStats';

// export class LeaderboardController {
//   private leaderboardService: LeaderboardService;

//   constructor(leaderboardService: LeaderboardService) {
//     this.leaderboardService = leaderboardService;
//   }

//   public async getHomeLeaderboard(req: Request, res: Response) {
//     try {
//       const homeTeamStats = await this.leaderboardService.getHomeTeamStats();
//       res.status(200).json(homeTeamStats);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }
