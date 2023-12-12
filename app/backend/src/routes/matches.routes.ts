import * as express from 'express';
// import TeamService from '../Interfaces/ITeamService';
import MatchController from '../controllers/match.controller';
import authMiddleware from '../middlewares/authMiddleware';

const route = express.Router();
const controllerMatch = new MatchController();

// ... (outras rotas existentes)

route.get('/', (req, res) => controllerMatch.getAll(req, res));
route.patch('/:id/finish', authMiddleware, (req, res) => controllerMatch.matchFinished(req, res));
route.patch('/:id', authMiddleware, (req, res) => controllerMatch.updateResult(req, res));
route.post('/', authMiddleware, (req, res) => controllerMatch.create(req, res));

export default route;
