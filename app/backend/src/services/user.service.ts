import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import ILogin from '../Interfaces/ILogin';
import tokenGenerate from '../utils/JWToken';
import GenerateError from '../utils/generateError';
import IUserService from '../Interfaces/IUserService';

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  login = async (login: ILogin): Promise<string | void> => {
    const { email, password } = login;
    const userExists = await this._userModel.findOne({ where: { email } });

    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      return tokenGenerate(login);
    }
    throw new GenerateError(401, 'Incorrect email or password');
  };
}
