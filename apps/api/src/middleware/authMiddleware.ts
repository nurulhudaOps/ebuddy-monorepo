import { type GenerateTokenData, type TokenData } from '@repo/entities/base';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import { ForbiddenError, UnauthorizedError } from '../helpers/utils/error';
import wrapper from '../helpers/utils/wrapper';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const generateToken = (payload: GenerateTokenData) => {
  const secretKey = configs.middleware.jwtSecret;
  const expiresIn = '1d';
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

export const decodeToken = (token: string): TokenData => {
  const decoded = jwt.decode(token);
  return decoded as TokenData;
};

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    wrapper.responseError(res, new UnauthorizedError('Authentication token is required'));
    return;
  }

  try {
    const decoded = jwt.verify(token, configs.middleware.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    wrapper.responseError(res, new ForbiddenError('Invalid or expired token'));
    return;
  }
};

export const basicAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    wrapper.responseError(res, new UnauthorizedError('Authentication required'));
    return;
  }

  const base64Credentials = authHeader.split(' ')[1] || '';
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [reqUser, reqPass] = credentials.split(':');

  const { basicUser, basicPass } = configs.middleware;
  if (reqUser !== basicUser && reqPass !== basicPass) {
    wrapper.responseError(res, new UnauthorizedError('Access denied'));
    return;
  }

  next();
};
