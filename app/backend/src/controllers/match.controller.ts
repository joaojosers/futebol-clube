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

  public async matchFinished(req: Request, res: Response) {
    await this._matchService.matchFinished(Number(req.params.id));
    res.status(200).json({ message: 'Finished' });
  }

  public async updateResult(req: Request, res: Response) {
    await this._matchService.updateResult(Number(req.params.id), req.body);
    res.status(200).json({ message: 'Match is updated!' });
  }

  public async create(req: Request, res: Response) {
    try {
      const matchCreated = await this._matchService.create(req.body);
      return res.status(201).json(matchCreated);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
