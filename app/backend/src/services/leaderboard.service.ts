import { TeamStats } from '../types/TeamStats';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

const associations = { include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }] };

const calculateTotalPoints = (match: Match): number => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    return 3; // Vitória
  } if (match.homeTeamGoals === match.awayTeamGoals) {
    return 1; // Empate
  }
  return 0; // Derrota
};

export default class LeaderboardService {
  constructor(private _matchModel = Match, private _teamModel = Team) {}

  public async getHomeMatches(): Promise<Match[]> {
    try {
      const homeMatches = await this._matchModel
        .findAll({ where: { inProgress: false }, ...associations });
      console.log('homeMatches', homeMatches);
      return homeMatches;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getHomeTeamStats(): Promise<TeamStats[]> {
    const homeMatches = await this.getHomeMatches();
    const teams = await this._teamModel.findAll();

    const matchesResult: TeamStats[] = teams.map((team) => {
      const filteredMatches = homeMatches.filter((match) => match.homeTeamId === team.id);

      return { name: team.teamName,
        totalPoints: filteredMatches.reduce((sum, match) => sum + calculateTotalPoints(match), 0),
        totalGames: filteredMatches.length,
        totalVictories: filteredMatches
          .reduce((sum, match) => sum + (calculateTotalPoints(match) === 3 ? 1 : 0), 0),
        totalDraws: filteredMatches
          .reduce((sum, match) => sum + (calculateTotalPoints(match) === 1 ? 1 : 0), 0),
        totalLosses: filteredMatches
          .reduce((sum, match) => sum + (calculateTotalPoints(match) === 0 ? 1 : 0), 0),
        goalsFavor: filteredMatches.reduce((sum, match) => sum + match.homeTeamGoals, 0),
        goalsOwn: filteredMatches.reduce((sum, match) => sum + match.awayTeamGoals, 0),
      };
    });

    return matchesResult;
  }
}

/* */
// leaderboard.service.ts
// import { TeamStats } from '../types/TeamStats';
// import Match from '../database/models/MatchModel';
// import Team from '../database/models/TeamModel';

// const associations = { include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }] };

// const calculateTotalPoints = (match: Match): number => {
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     return 3; // Vitória
//   } if (match.homeTeamGoals === match.awayTeamGoals) {
//     return 1; // Empate
//   }
//   return 0; // Derrota
// };

// export default class LeaderboardService {
//   constructor(private _matchModel = Match, private _teamModel = Team) {}

//   public async getHomeMatches(): Promise<Match[]> {
//     try {
//       // Obtenha todas as partidas em que o time é o time da casa
//       const homeMatches = await this
//         ._matchModel.findAll({ where: { inProgress: false }, ...associations });
//       console.log('homeMatches', homeMatches);
//       return homeMatches;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const matchesResult: TeamStats[] = [];
//     const homeMatches = await this.getHomeMatches();
//     const teams = await this._teamModel.findAll();
//     for (const team of teams) {
//       const filteredMatches = homeMatches.filter((match) => match.homeTeamId === team.id);
//       const teamStats: TeamStats = {
//         name: team.teamName,
//         totalPoints: 0,
//         totalGames: 0,
//         totalVictories: 0,
//         totalDraws: 0,
//         totalLosses: 0,
//         goalsFavor: 0,
//         goalsOwn: 0,
//       };
//       filteredMatches.forEach((match) => {
//         const pointsMatch = calculateTotalPoints(match);
//         teamStats.totalPoints += pointsMatch;
//         teamStats.totalGames += 1;
//         teamStats.totalVictories += pointsMatch === 3 ? 1 : 0;
//         teamStats.totalDraws += pointsMatch === 1 ? 1 : 0;
//         teamStats.totalLosses += pointsMatch === 0 ? 1 : 0;
//         teamStats.goalsFavor += match.homeTeamGoals;
//         teamStats.goalsOwn += match.awayTeamGoals;
//       });
//       matchesResult.push(teamStats);
//     }
//     return matchesResult;
//   }
// }
//
/* eslint-disable max-lines-per-function */
// leaderboard.service.ts
// import { TeamStats } from '../types/TeamStats';
// // import MatchService from './match.service';
// import Match from '../database/models/MatchModel';
// import Team from '../database/models/TeamModel';

// const associations = { include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }] };
// const calculateTotalPoints:(match: Match) => number = (match: Match) => {
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     return 3; // Vitória
//   } if (match.homeTeamGoals === match.awayTeamGoals) {
//     return 1; // Empate
//   }
//   return 0; // Derrota
// };
// export default class LeaderboardService {
//   // private matchService: MatchService;
//   constructor(private _matchModel = Match, private _teamModel = Team) {}
//   public async getHomeMatches(teamName: string): Promise<Match[]> {
//     try {
//       const homeTeam = await this._teamModel.findOne({ where: { teamName }, ...associations });
//       if (!homeTeam) throw new Error(`Team with name '${teamName}' not found.`);
//       return await Match
//         .findAll({ where: { homeTeamId: homeTeam.id, inProgress: false }, ...associations });
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   public async getHomeTeamStats(teamName: string): Promise<TeamStats> {
//     const matchesResult = {
//       name: teamName,
//       totalPoints: 0,
//       totalGames: 0,
//       totalVictories: 0,
//       totalDraws: 0,
//       totalLosses: 0,
//       goalsFavor: 0,
//       goalsOwn: 0,
//     };

//     const homeMatches = await this.getHomeMatches(teamName);
//     homeMatches.forEach((match) => {
//       matchesResult.totalPoints += calculateTotalPoints(match);
//       matchesResult.totalGames += 1;
//       matchesResult.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
//       matchesResult.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
//       matchesResult.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
//       matchesResult.goalsFavor += match.homeTeamGoals;
//       matchesResult.goalsOwn += match.awayTeamGoals;
//     });

//     return matchesResult;
//   }
// }

// private calculateTotalPoints(match: Match): number {
//   this.calculateTotalPoints(match);
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     return 3; // Vitória
//   } if (match.homeTeamGoals === match.awayTeamGoals) {
//     return 1; // Empate
//   }
//   return 0; // Derrota
// }
// import { TeamStats } from '../types/TeamStats';
// import MatchService from './match.service';
// import Match from '../database/models/MatchModel';
// import Team from '../database/models/TeamModel';

// const associations = { include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }] };

// export default class LeaderboardService {
//   private matchService: MatchService;

//   constructor(matchService: MatchService) {
//     this.matchService = matchService;
//   }

//   public async getHomeMatches(teamName: string): Promise<Match[]> {
//     try {
//       const homeTeam = await Team.findOne({ where: { teamName }, ...associations });
//       if (!homeTeam) throw new Error(`Team with name '${teamName}' not found.`);
//       return await Match.findAll({ where: { homeTeamId: homeTeam.id, inProgress: false }, ...associations });
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const homeMatches = await this.matchService.getHomeMatches();
//     const homeTeamStats: TeamStats[] = homeMatches.map((match) => ({
//       name: match.homeTeam.teamName,
//       totalPoints: this.calculateTotalPoints(match),
//       totalGames: 1,
//       totalVictories: match.homeTeamGoals > match.awayTeamGoals ? 1 : 0,
//       totalDraws: match.homeTeamGoals === match.awayTeamGoals ? 1 : 0,
//       totalLosses: match.homeTeamGoals < match.awayTeamGoals ? 1 : 0,
//       goalsFavor: match.homeTeamGoals,
//       goalsOwn: match.awayTeamGoals,
//     }));

//     return homeTeamStats;
//   }

//   private calculateTotalPoints(match: Match): number {
//     if (match.homeTeamGoals > match.awayTeamGoals) {
//       return 3; // Vitória
//     } else if (match.homeTeamGoals === match.awayTeamGoals) {
//       return 1; // Empate
//     } else {
//       return 0; // Derrota
//     }
//   }
// }
