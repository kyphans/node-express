import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import createError from 'http-errors';

import userService from '../services/user.service';
import { verifyRefreshToken, signAccessToken, signRefreshToken, isValidPassword, hashPassword } from '../utils/auth';

// SHOULD BE STORE IN DB
// CAN USE REDIS TO STORE AND CACHE LIST REFRESH TOKEN OF USERS
let refreshTokens: string[] = [];

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw createError.BadRequest('Body is missing required fields');
    }
    const hashedPassword = await hashPassword(password);
    await userService.createUser(name, email, hashedPassword);
    res.status(200).json('Create user successfully!');
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    // Authentication
    const user = await userService.getUserByEmail(payload.email);
    if (!user) {
      throw createError.Unauthorized('Invalid email or password');
    }
    const passwordMatch = await isValidPassword(payload.password, user.password);
    if (!passwordMatch) {
      throw createError.Unauthorized('Invalid email or password');
    }
    const { id, name, email } = user;
    // Authorization
    const accessToken = signAccessToken({ id, name, email });
    const refreshToken = signRefreshToken({ id, name, email });
    refreshTokens.push(refreshToken);
    // Add to model
    res
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .status(200)
      .json({
        "message": "Login successfully!",
        "accessToken": accessToken,
        "dataUser": { id, name, email }
      });

  } catch (e) {
    next(e);
  }
};

export const requestRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //save list requestRefreshToken to DB
    const refreshTokenPayload = req.cookies.refreshToken;
    if (!refreshTokenPayload) {
      throw createError.Unauthorized('Empty refresh-token');
    }
    if (!refreshTokens.includes(refreshTokenPayload)) {
      throw createError.Forbidden('Invalid refresh-token');

    }
    const decoded: any = verifyRefreshToken(refreshTokenPayload);
    const { id, name, email } = decoded;

    // Authorization
    const accessToken = signAccessToken({ id, name, email });
    const refreshToken = signRefreshToken({ id, name, email });
    refreshTokens = refreshTokens.filter(token => token !== refreshTokenPayload)
    refreshTokens.push(refreshToken);
    res
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .status(200)
      .json({
        "message": "Refresh token successfully!",
        "accessToken": accessToken,
        "dataUser": { id, name, email }
      });
  } catch (e) {
    next(e);
  }
};
