import * as express from 'express';
// import TeamService from '../Interfaces/ITeamService';
import UserController from '../controllers/user.controller';

const route = express.Router();
const controllerUser = new UserController();

route.post('/', (req, res, next) => controllerUser.login(req, res, next));

export default route;
