// /app/backend/src/middlewares/loginMiddleware.ts
import { NextFunction, Request, Response } from 'express';

class LoginMiddleware {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    // Adicione outras validações, se necessário
    next();
  }
}

export default LoginMiddleware;

// import { NextFunction, Request, Response } from 'express';
// import JWT from '../utils/JWT';

// class Validations {
//   static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
//     const book = req.body;
//     const requiredKeys = ['title', 'price', 'author', 'isbn'];
//     const notFoundKey = requiredKeys.find((key) => !(key in book));
//     if (notFoundKey) {
//       return res.status(400).json({ message: `${notFoundKey} is required` });
//     }

//     next();
//   }

//   static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields must be filled' });
//     }
//     // const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     // if (!emailRegex.test(email)) {
//     //   return res.status(401).json({ message: 'Invalid email' });
//     // }
//     // if (password.length < 6) {
//     //   return res.status(401).json({ message: 'Invalid email or password' });
//     // }
//     next();
//   }

//   static async validateToken(req: Request, res: Response, next: NextFunction):
//   Promise<Response | void> {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(404).json({ message: 'Token not found' });
//     }
//     const validToken = await JWT.verify(token);
//     if (validToken === 'Token must be a valid token') {
//       return res.status(401).json({ message: validToken });
//     }
//     next();
//   }

//   static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
//     const user = req.body;
//     const requiredKeys = ['email', 'password', 'name'];
//     const notFoundKey = requiredKeys.find((key) => !(key in user));
//     if (notFoundKey) {
//       return res.status(400).json({ message: `${notFoundKey} is required` });
//     }

//     next();
//   }
// }

// export default Validations;
