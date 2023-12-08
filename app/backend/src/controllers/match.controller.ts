import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private _matchService = new MatchService()) {}

  public async getAll(req: Request, res: Response) {
    let matches = [];
    if (!req.query.inProgress) {
      matches = await this._matchService.findAll();
    } else {
      matches = await this._matchService.findInProgress(req.query.inProgress === 'true');
    }
    res.status(200).json(matches);
  }
}

// import { Request, Response } from 'express';
// import MatchService from '../services/match.service';

// export default class MatchController {
//   constructor(private _matchService = new MatchService()) {}

//   public async getAll(req: Request, res: Response) {
//     let matches = [];
//     if (!req.query.inProgress) {
//       matches = await this._matchService.getAll();
//     } else {
//       matches = await this._matchService.findInProgress(req.query.inProgress === 'true');
//     }
//     res.status(200).json(matches);
//   }
// }

// import { Request, Response } from 'express';
// // import IMatchService from '../Interfaces/IMatchService';
// import MatchService from '../services/match.service';

// export default class MatchController {
//   // constructor(private _MatchService: IMatchService) {}

//   constructor(
//     private _MatchService = new MatchService(),
//   ) {}

//   public async getAll(_req: Request, _res: Response) {
//     let matches = [];
//     if (!_req.query.inProgress) {
//       matches = await this._MatchService.getAll;
//     } else {
//       matches = await this._MatchService.findInProgress(req.query.inProgress === 'true');
//     }
//     // return res.status(200).json(matches);
//     // const serviceResponse = await this._MatchService.getAll();
//     // res.status(200).json(serviceResponse);
//   }
// }

//   public async getByPk(req: Request, res: Response) {
//     const { id } = req.params;

//     const serviceResponse = await this._MatchService.getByPk(Number(id));

//     res.status(200).json(serviceResponse);
//   }
