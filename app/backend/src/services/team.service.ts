// import ITeamService from '../Interfaces/ITeamService';
import Team from '../database/models/TeamModel';
// import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  constructor(
    private _teamModel = Team,
  ) {}

  public async getAll(): Promise<Team[] > {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  public async getByPk(id: number): Promise<any> {
    const team = await this._teamModel.findByPk(id);
    console.log(team);
    return team;
  }
}
//   findAll = async (): Promise<ITeam[] | void> => {
//     const teams = await this._teamModel.findAll();
//     if (teams) return teams;
//   };

//   findByPk = async (id: number): Promise<ITeam | void> => {
//     const team = await this._teamModel.findByPk(id);
//     if (team) return team;
//   };
