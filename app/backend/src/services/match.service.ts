// import IMatch from '../Interfaces/IMatch';
import Match from '../database/models/MatchModel';

const associations = {
  include: [
    { all: true, attributes: { exclude: ['id'] } },

  ],
};

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
      ...associations });
    return matches;
  }
}
