// /app/backend/src/routes/user.routes.ts
import { Request, Response, Router } from 'express';
// import authMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/user.controller';
import LoginMiddleware from '../middlewares/loginMiddleware';

const controllerUser = new UserController();
const route = Router();

// Utilize o middleware diretamente na definição da rota
route.get(
  '/',
  // authMiddleware,
  (req: Request, res: Response) => controllerUser.userRole(req, res),
);
route.post(
  '/',
  LoginMiddleware.validateLogin,

  (req: Request, res: Response) => controllerUser.login(req, res),
);

export default route;
