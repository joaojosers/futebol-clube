import { Request, Response } from 'express';

import TeamService from '../services/team.service';

export default class TeamController {
  constructor(
    private _teamService = new TeamService(),
  ) {}

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this._teamService.getAll();
    res.status(200).json(serviceResponse);
  }

  public async getByPk(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this._teamService.getByPk(Number(id));

    res.status(200).json(serviceResponse);
  }
}
