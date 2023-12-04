import * as express from 'express';
// import TeamService from '../Interfaces/ITeamService';
import TeamController from '../controllers/team.controller';

const route = express.Router();
const controlleTeam = new TeamController();

route.get('/:id', controlleTeam.getByPk);
route.get('/', controlleTeam.getAll);

export default route;
