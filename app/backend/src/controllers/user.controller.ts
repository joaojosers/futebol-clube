import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(
    private _userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._userService.login({ email, password });

    if (!token) return res.status(401).json({ message: 'Incorrect email or password' });

    return res.status(200).json({ token });
  }
}
