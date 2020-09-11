import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Verifica se tem token válido
  if (!authConfig) {
    return res.status (401).json ({error: 'Token não existe!'});
  }

  const [, token] = authHeader.split (' ');

  try {
    const decoder = await promisify (jwt.verify) (token, authConfig.secret);

    //Recebe o id do usuário logado
    req.userId = decoder.id;

    return next ();

   } catch (error) {
    return res.status (401).json ({error: 'Token inválido!'});
  }
};
