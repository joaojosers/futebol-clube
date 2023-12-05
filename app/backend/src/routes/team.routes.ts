import * as express from 'express';
// import TeamService from '../Interfaces/ITeamService';
import TeamController from '../controllers/team.controller';

const route = express.Router();
const controlleTeam = new TeamController();

route.get('/:id', (req, res) => controlleTeam.getByPk(req, res));
route.get('/', (req, res) => controlleTeam.getAll(req, res));

export default route;
