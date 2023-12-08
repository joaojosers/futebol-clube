import * as express from 'express';
// import TeamService from '../Interfaces/ITeamService';
import MatchController from '../controllers/match.controller';

const route = express.Router();
const controllerMatch = new MatchController();

route.get('/', (req, res) => controllerMatch.getAll(req, res));

export default route;
