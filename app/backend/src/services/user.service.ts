import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import ILogin from '../Interfaces/ILogin';
import tokenGenerate from '../utils/JWToken';

import IUserService from '../Interfaces/IUserService';

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  login = async (login: ILogin): Promise<string | void> => {
    const { email, password } = login;
    // const error = { status: 400, message: 'Incorrect email or password' };
    const userExists = await this._userModel.findOne({ where: { email } });

    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      return tokenGenerate(login);
    }
  };
}
