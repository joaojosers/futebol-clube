// /app/backend/src/routes/user.routes.ts
import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginMiddleware from '../middlewares/loginMiddleware';
// import authMiddleware from '../middlewares/authMiddleware';

const controllerUser = new UserController();
const route = Router();

// Utilize o middleware diretamente na definição da rota
route.get(
  '/',
  (req: Request, res: Response) => controllerUser.userRole(req, res),
);
route.post(
  '/',
  LoginMiddleware.validateLogin,

  (req: Request, res: Response) => controllerUser.login(req, res),
);

export default route;

// // import TeamService from '../Interfaces/ITeamService';
// import UserController from '../controllers/user.controller';
// import Validations from '../middlewares/loginMiddleware';

// const route = express.Router();
// const controllerUser = new UserController();

// route.post('/login', Validations.login(req, res, next) => controllerUser.login(req, res, next));

// export default route;
