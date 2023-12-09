import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

const associations = {
  include: [
    { all: true, attributes: { exclude: ['id'] } },

  ],
};

export default class MatchService {
  constructor(private _matchModel = Match, private _teamModel = Team) {}

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

  public async matchFinished(id: number): Promise<void> {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateResult(id: number, match: Match): Promise<void> {
    await this._matchModel.update(
      { homeTeamGoals: match.homeTeamGoals, awayTeamGoals: match.awayTeamGoals },
      { where: { id } },
    );
  }

  public async create(match: Match): Promise<Match> {
    try {
      if (match.homeTeamId === match.awayTeamId) {
        throw new Error('It is not possible to create a match with two equal teams');
      }

      const homeTeamExists = await this._teamModel.findByPk(match.homeTeamId);
      const awayTeamExists = await this._teamModel.findByPk(match.awayTeamId);

      if (!homeTeamExists || !awayTeamExists) {
        throw new Error('There is no team with such id!');
      }

      const matchCreated = await this._matchModel.create({ ...match, inProgress: true });
      return matchCreated;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
