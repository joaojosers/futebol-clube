import ITeam from './ITeam';

export default interface ITeamService {
  getAll(): Promise<ITeam[] | void>;
  getByPk(id: number): Promise<ITeam | void>;
}
