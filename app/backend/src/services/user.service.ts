import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';
import ILogin from '../Interfaces/ILogin';
import IUserService from '../Interfaces/IUserService';
import tokenGenerate from '../utils/JWToken';

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  login = async (login: ILogin): Promise<string | void> => {
    const { email, password } = login;
    const userExists = await this._userModel.findOne({ where: { email } });

    if (userExists && bcrypt.compareSync(password, userExists.password)) {
      const loginRole = userExists?.dataValues.role;
      const getRoleLogin = { ...login, role: loginRole };
      return tokenGenerate(getRoleLogin);
    }
  };

  userRole = (token: string): string | undefined => {
    try {
      const tokenRole = token.split(' ')[1];

      const decoded = jwt.verify(tokenRole, process.env.JWT_SECRET || '');
      const { role } = decoded as jwt.JwtPayload;
      // const user = await this._userModel.findByPk(decoded['id'], { attributes: ['role'] });
      return role;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
}

// import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// import User from '../database/models/UserModel';
// import ILogin from '../Interfaces/ILogin';
// import IUserService from '../Interfaces/IUserService';
// import tokenGenerate from '../utils/JWToken';

// export default class UserService implements IUserService {
//   constructor(private _userModel = User) {}

//   login = async (login: ILogin): Promise<string | void> => {
//     const { email, password } = login;
//     const userExists = await this._userModel.findOne({ where: { email } });

//     if (userExists && bcrypt.compareSync(password, userExists.password)) {
//       const loginRole = userExists?.dataValues.role;
//       const getRoleLogin = { ...login, role: loginRole };
//       const newToken = tokenGenerate(getRoleLogin);
//       return newToken;
//     }
//   };

//   userRole = async (newToken: string): Promise<string | undefined> => {
//     try {
//       const decoded = jwt.verify(newToken, 'jwt_secret') as jwt.JwtPayload;
//       console.log('user Service', decoded);
//       const user = await this._userModel.findByPk(decoded.data.id, { attributes: ['role'] });
//       console.log('user Service', user);
//       return user?.role;
//     } catch (error) {
//       console.error(error);
//       return undefined;
//     }
//   };
// }

// import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// import User from '../database/models/UserModel';
// import ILogin from '../Interfaces/ILogin';
// import tokenGenerate from '../utils/JWToken';
// import IUserService from '../Interfaces/IUserService';
// // import UserModel from '../database/models/UserModel';

// export default class UserService implements IUserService {
//   constructor(private _userModel = User) {}

//   login = async (login: ILogin): Promise<string | void> => {
//     const { email, password } = login;
//     const userExists = await this._userModel.findOne({ where: { email } });
//     const loginRole = userExists?.dataValues.role;
//     const getRoleLogin = { ...login, role: loginRole };
//     // const error = { status: 400, message: 'Incorrect email or password' };
//     console.log('UserService', userExists);
//     if (userExists && bcrypt.compareSync(password, userExists.password)) {
//       return tokenGenerate(getRoleLogin);
//     }
//   };

//   private static decodeToken(token: string) {
//     const decoded = jwt.decode(token);
//     return decoded as jwt.JwtPayload;
//   }

//   userRole = async (token: string): Promise< string | undefined> => {
//     const decoded = UserService.decodeToken(token);
//     const user = await this._userModel.findByPk(decoded.data.id, { attributes: ['role'] });
//     return user?.role;
//   };
// }

// userRole = async (email:string): Promise< { role: string } | void> => {
//   const roleUser = await this._userModel.findOne({ where: { email } });
//   if (roleUser) return { role: roleUser.role };
// };
