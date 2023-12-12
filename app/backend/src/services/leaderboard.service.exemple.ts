// leaderboard.service.ts
// import { TeamStats } from '../types/TeamStats';
// import MatchService from './match.service';
// import Match from '../database/models/MatchModel';
// import Team from '../database/models/TeamModel';

// const associations = {
//   include: [
//     { model: Team, as: 'homeTeam', attributes: ['teamName'] },
//     // { model: Team, as: 'awayTeam', attributes: ['teamName'] },
//   ],
// };
// export default class LeaderboardService {
//   private matchService: MatchService;

//   constructor(matchService: MatchService) {
//     this.matchService = matchService;
//   }

//   public async getHomeMatches(teamName: string): Promise<Match[]> {
//     try {
//       // Encontre o ID do time com base no nome
//       const homeTeam = await Team.findOne({
//         where: { teamName },
//         ...associations,
//       });
//       if (!homeTeam) {
//         throw new Error(`Team with name '${teamName}' not found.`);
//       }
//       // Encontre todas as partidas em que o time é o time da casa
//       const homeMatches = await Match.findAll({
//         where: {
//           homeTeamId: homeTeam.id,
//           inProgress: false, // Considere apenas partidas finalizadas
//         },
//         ...associations,
//       });
//       return homeMatches;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   // include: [
//   //   { model: Team, as: 'homeTeam', attributes: ['teamName'] },
//   //   { model: Team, as: 'awayTeam', attributes: ['teamName'] },
//   // ],
//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const homeMatches = await Match.getHomeMatches(); // Chamando o método estático da classe Match

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
//     } if (match.homeTeamGoals === match.awayTeamGoals) {
//       return 1; // Empate
//     }
//     return 0; // Derrota
//   }
// }

// // leaderboard.service.ts

// import { TeamStats } from '../types/TeamStats';
// import Match from '../database/models/MatchModel';

// export default class LeaderboardService {
//   // Método adicionado diretamente ao serviço
//   public async getHomeMatches(): Promise<Match[]> {
//     // Lógica para obter partidas em casa (home matches)
//     // Substitua o retorno de exemplo pela sua lógica de obtenção das partidas
//     const homeMatches: Match[] = []; // Exemplo: implemente a lógica para obter as partidas em casa
//     return homeMatches;
//   }

//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const homeMatches = await this.getHomeMatches();

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
//     } if (match.homeTeamGoals === match.awayTeamGoals) {
//       return 1; // Empate
//     }
//     return 0; // Derrota
//   }
// }

// leaderboard.service.ts

// import { TeamStats } from '../types/TeamStats';
// // import MatchService from './match.service';
// import Match from '../database/models/MatchModel';

// export default class LeaderboardService {
//   constructor(private _matchModel = Match) {}

//   public async getHomeTeamStats(): Promise<TeamStats[]> {
//     const homeMatches = await this._matchModel.getHomeMatches();

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
//     } if (match.homeTeamGoals === match.awayTeamGoals) {
//       return 1; // Empate
//     }
//     return 0; // Derrota
//   }
// }

// // leaderboard.service.ts

// import { TeamStats } from '../types/TeamStats';
// import MatchService from './match.service';
// import Match from '../database/models/MatchModel';

// export default class LeaderboardService {
//   private matchService: MatchService;

//   constructor(matchService: MatchService) {
//     this.matchService = matchService;
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
