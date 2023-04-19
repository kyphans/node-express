import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    // Get token from Bearer [token]
    const token = authorizationHeader?.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Empty token');
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        console.log(err);
        throw createError.Forbidden();
      }
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          reject(createError.Forbidden());
        }
        resolve(decoded);
      });
    });
  } catch (err) {
    throw createError.BadRequest(
      'Something went wrong when verify refresh token'
    );
  }
};

export const signAccessToken = (payload: object | string) => {
  try {
    console.log('payload', payload);
    const options = {
      expiresIn: '5m'
    };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
    return accessToken;
  } catch (err) {
    throw createError.BadRequest(
      'Something went wrong when signing access token'
    );
  }
};

export const signRefreshToken = (payload: object | string) => {
  try {
    const options = {
      expiresIn: '90 days'
    };
    const accessToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, options);
    return accessToken;
  } catch (err) {
    throw createError.BadRequest(
      'Something went wrong when signing access token'
    );
  }
};

export const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw createError.BadRequest('Something went wrong when hash password');
  }
};

export const isValidPassword = async (
  payloadPassword: string,
  userPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(payloadPassword, userPassword);
    return isMatch;
  } catch (err) {
    throw createError.BadRequest('Something went wrong when valid password');
  }
};
