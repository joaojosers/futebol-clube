import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._userService.login({ email, password });

    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token });
  }

  public async userRole(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const role = await this._userService.userRole(token);

    // if (role === undefined) {
    //   return res.status(401).json({ message: 'Token must be a valid token' });
    // }

    return res.status(200).json({ role });
  }
}

// import { Request, Response } from 'express';
// import UserService from '../services/user.service';

// export default class UserController {
//   constructor(
//     private _userService = new UserService(),
//   ) {}

//   public async login(req: Request, res: Response) {
//     const { email, password } = req.body;
//     const token = await this._userService.login({ email, password });

//     if (!token) return res.status(401).json({ message: 'Invalid email or password' });

//     return res.status(200).json({ token });
//   }

//   public async userRole(req: Request, res: Response) {
//     const role = await this._userService.userRole(req.body.email);
//     if (role === undefined) return res.status(404).json({ message: 'Token must be a valid token' });
//     if (!role) return res.status(404).json({ message: 'Token not found' });
//     return res.status(200).json({ role });
//   }
// }

// public async userRole(req: Request, res: Response) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'token not found' });
//   }

//   const userFoundRole = await UserService.userRole(token);
//   return res.status(200).json({ role: userRole });
// }
