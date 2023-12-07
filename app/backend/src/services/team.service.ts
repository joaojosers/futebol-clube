import Team from '../database/models/TeamModel';

export default class TeamService {
  constructor(
    private _teamModel = Team,
  ) {}

  public async getAll(): Promise<Team[] > {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  public async getByPk(id: number): Promise<Team | null > {
    const team = await this._teamModel.findByPk(id);
    console.log(team);
    return team;
  }
}
