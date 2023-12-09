import * as jsonwebtoken from 'jsonwebtoken';
import IUser from '../Interfaces/ILogin';

export default function tokenGenerate(user:IUser) {
  const payload = { email: user.email, username: user.username, role: user.role };
  const secret = process.env.JWT_SECRET as string;
  const jwt = jsonwebtoken;
  console.log('tokenGenerate', jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' }));
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });
}
