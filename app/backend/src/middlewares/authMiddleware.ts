import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/UserModel';
import { User } from '../types/User';
import JWT from '../utils/JWT';

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = JWT.verify(authorization) as User;
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) return res.status(401).json({ message: 'Token must be a valid token' });

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default authMiddleware;

// import * as jwt from 'jsonwebtoken';
// import { RequestHandler } from 'express';

// const authMiddleware: RequestHandler = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) return res.status(401).json({ message: 'Token not found' });

//   try {
//     const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
//     req.body.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token must be a valid token' });
//   }
// };
// export default authMiddleware;
