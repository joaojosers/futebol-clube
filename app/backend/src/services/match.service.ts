// import IMatch from '../Interfaces/IMatch';
import Match from '../database/models/MatchModel';

export default class MatchService {
  constructor(private _matchModel = Match) {}

  public async findAll(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      include: [
        { all: true, attributes: { exclude: ['id'] } },

      ],
    });
    return matches;
  }

  public async findInProgress(query: boolean): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      where: {
        inProgress: query,
      },
    });
    return matches;
  }
}

// import IMatch from '../Interfaces/IMatch';
// import { IMatchService } from '../Interfaces/IMatchService';
// import Match from '../database/models/MatchModel';

// export default class MatchService implements IMatchService {
//   constructor(private _matchModel = Match) {}

//   public async getAll(): Promise<IMatch[]> {
//     const matches = await this._matchModel.findAll();
//     return matches;
//   }

//   public findInProgress = async (query: boolean): Promise<IMatch[]> => {
//     const matches = await this._matchModel.findAll({
//       where: {
//         inProgress: query,
//       },
//     });
//     return matches;
//   };
// }
// include: [
//   { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
//   { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
// ],
// import IMatch from 'src/interfaces/IMatch';
// import { IMatchService } from 'src/Interfaces/IMatchService';
// import Match from '../database/models/MatchModel';

// export default class _MatchService implements IMatchService {
//   constructor(
//     private _matchModel = Match,
//   ) {}

//   public async getAll(): Promise<IMatch[] > {
//     const matches = await this._matchModel.findAll;
//     return matches;
//   }

//   findInProgress = async (query: boolean): Promise<IMatch[]> => {
//     const matches = await this._matchModel.findAll({
//       where: {
//         inProgress: query,
//       },
//       include: [
//         { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
//         { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
//       ],
//     });
//     return matches;
//   };
// }

// public async getByPk(id: number): Promise<Team | null > {
//   const team = await this._matchModel.findByPk(id);
//   return team;
// }
