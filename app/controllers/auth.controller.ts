import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import createError from 'http-errors';

import userService from '../services/user.service';
import { verifyRefreshToken, signAccessToken, signRefreshToken, isValidPassword, hashPassword } from '../utils/auth';

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
    const { id, name, email, password } = user;
    // Authorization
    const accessToken = signAccessToken({ name, email, password });
    const refreshToken = signRefreshToken({ name, email, password });
    // Add to model
    res.status(200).json({
      "message": "The password is correct",
      "accessToken": accessToken,
      "refreshToken": refreshToken,
      "dataUser": { id, name, email }
    });

  } catch (e) {
    next(e);
  }
};

export const requestRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //save list requestRefreshToken to DB
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      throw createError.Unauthorized('Empty refresh-token');
    }
    const decoded:any = await verifyRefreshToken(refreshToken);
    const { name, email, password } = decoded;

    // Authorization
    const newAccessToken = signAccessToken({ name, email, password });
    const newRefreshToken = signRefreshToken({ name, email, password });
    console.log('newToken', { newAccessToken, newRefreshToken });
    res.status(200).json({ newAccessToken, newRefreshToken });
  } catch (e) {
    next(e);
  }
};
