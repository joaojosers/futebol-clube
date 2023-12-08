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
