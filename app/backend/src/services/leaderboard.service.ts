/* */
import { TeamStats } from '../types/TeamStats';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

const associations = { include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }] };

const calculateTotalPoints = (match: Match): number => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    return 3; // Vitória
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
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

  private calculateStatsForTeam = (team: Team, filterMatches: Match[]): TeamStats => {
    // const sumProperty = (property: string) => filterMatches
    //   .reduce((sum, match) => sum + match[property], 0);

    // const totalPoints = filterMatches.reduce((sum, match) => sum + calculateTotalPoints(match), 0);
    const sumProperty = (property: keyof Match) => filterMatches
      .reduce((sum, match) => sum + Number(match[property]), 0);

    const totalPoints = filterMatches.reduce((sum, match) => sum + calculateTotalPoints(match), 0);

    return {
      name: team.teamName,
      totalPoints,
      totalGames: filterMatches.length,
      totalVictories: filterMatches
        .reduce((sum, match) => sum + (calculateTotalPoints(match) === 3 ? 1 : 0), 0),
      totalDraws: filterMatches
        .reduce((sum, match) => sum + (calculateTotalPoints(match) === 1 ? 1 : 0), 0),
      totalLosses: filterMatches
        .reduce((sum, match) => sum + (calculateTotalPoints(match) === 0 ? 1 : 0), 0),
      goalsFavor: sumProperty('homeTeamGoals'),
      goalsOwn: sumProperty('awayTeamGoals'),
      goalsBalance: sumProperty('homeTeamGoals') - sumProperty('awayTeamGoals'),
      efficiency: ((totalPoints / (filterMatches.length * 3)) * 100).toFixed(2),
    };
  };

  public async getHomeTeamStats(): Promise<TeamStats[]> {
    const homeMatches = await this.getHomeMatches();
    const teams = await this._teamModel.findAll();

    return teams.map((team) => {
      const filterMatches = homeMatches.filter((match) => match.homeTeamId === team.id);
      return this.calculateStatsForTeam(team, filterMatches);
    }).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }
}

/* *
/* */
// import { TeamStats } from '../types/TeamStats';
// import Match from '../database/models/MatchModel';
// import Team from '../database/models/TeamModel';

// const associations = { include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }] };

// const calculateTotalPoints = (match: Match): number => {
//   if (match.homeTeamGoals > match.awayTeamGoals) {
//     return 3; // Vitória
//   }
//   if (match.homeTeamGoals === match.awayTeamGoals) {
//     return 1; // Empate
//   }
//   return 0; // Derrota
// };

// export default class LeaderboardService {
//   constructor(private _matchModel = Match, private _teamModel = Team) {}

//   public async getHomeMatches(): Promise<Match[]> {
//     try {
//       const homeMatches = await this._matchModel
//         .findAll({ where: { inProgress: false }, ...associations });
//       console.log('homeMatches', homeMatches);
//       return homeMatches;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const homeMatches = await this.getHomeMatches();
//     const teams = await this._teamModel.findAll();

//     const matchesResult: TeamStats[] = teams.map((team) => {
//       const filterMatches = homeMatches.filter((match) => match.homeTeamId === team.id);

//       const teamStats: TeamStats = {
//         name: team.teamName,
//         totalPoints: filteredMatches.reduce((sum, match) => sum + calculateTotalPoints(match), 0),
//         totalGames: filteredMatches.length,
//         totalVictories: filteredMatches
//           .reduce((sum, match) => sum + (calculateTotalPoints(match) === 3 ? 1 : 0), 0),
//         totalDraws: filteredMatches
//           .reduce((sum, match) => sum + (calculateTotalPoints(match) === 1 ? 1 : 0), 0),
//         totalLosses: filteredMatches
//           .reduce((sum, match) => sum + (calculateTotalPoints(match) === 0 ? 1 : 0), 0),
//         goalsFavor: filteredMatches.reduce((sum, match) => sum + match.homeTeamGoals, 0),
//         goalsOwn: filteredMatches.reduce((sum, match) => sum + match.awayTeamGoals, 0),
//       };

//       teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
//       teamStats.efficiency = ((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100)
//         .toFixed(2);

//       return teamStats;
//     });

//     matchesResult.sort((a, b) => {
//       if (b.totalPoints !== a.totalPoints) {
//         return b.totalPoints - a.totalPoints;
//       }
//       if (b.totalVictories !== a.totalVictories) {
//         return b.totalVictories - a.totalVictories;
//       }
//       if (b.goalsBalance !== a.goalsBalance) {
//         return b.goalsBalance - a.goalsBalance;
//       }
//       return b.goalsFavor - a.goalsFavor;
//     });

//     return matchesResult;
//   }
// }
/* */
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

//   private async getHomeMatches(): Promise<Match[]> {
//     try {
//       return await this._matchModel.findAll({ where: { inProgress: false }, ...associations });
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const homeMatches = await this.getHomeMatches();
//     const teams = await this._teamModel.findAll();

//     const matchesResult: TeamStats[] = teams.map((team) => {
//       const filteredMatches = homeMatches.filter((match) => match.homeTeamId === team.id);

//       const teamStats: TeamStats = {
//         name: team.teamName,
//         totalPoints: filteredMatches.reduce((sum, match) => sum + calculateTotalPoints(match), 0),
//         totalGames: filteredMatches.length,
//         totalVictories: filteredMatches
//           .reduce((sum, match) => sum + (calculateTotalPoints(match) === 3 ? 1 : 0), 0),
//         totalDraws: filteredMatches
//           .reduce((sum, match) => sum + (calculateTotalPoints(match) === 1 ? 1 : 0), 0),
//         totalLosses: filteredMatches
//           .reduce((sum, match) => sum + (calculateTotalPoints(match) === 0 ? 1 : 0), 0),
//         goalsFavor: filteredMatches.reduce((sum, match) => sum + match.homeTeamGoals, 0),
//         goalsOwn: filteredMatches.reduce((sum, match) => sum + match.awayTeamGoals, 0),
//       };

//       teamStats.goalsBalance = teamStats.goalsFavor - teamStats.goalsOwn;
//       teamStats.efficiency = ((teamStats.totalPoints / (teamStats.totalGames * 3)) * 100)
//         .toFixed(2);

//       return teamStats;
//     });

//     matchesResult.sort((a, b) => (b.totalPoints !== a.totalPoints ? b.totalPoints - a.totalPoints
//       : b.totalVictories !== a.totalVictories ? b.totalVictories - a.totalVictories
//         : b.goalsBalance !== a.goalsBalance ? b.goalsBalance - a.goalsBalance
//           : b.goalsFavor - a.goalsFavor));

//     return matchesResult;
//   }
// }
