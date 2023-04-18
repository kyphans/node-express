import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import createError from 'http-errors';

import userService from '../services/user.service';

const saltRounds = 10;

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw createError.BadRequest('Body is missing required fields');
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('hashedPassword', hashedPassword);

    await userService.createUser(name, email, hashedPassword);
    res.status(200).json('Create user successfully!');
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw createError.Unauthorized('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createError.Unauthorized('Invalid email or password');
    }

    // The password is correct
    // create and return a JWT token

    res.status(200).json('The password is correct');

  } catch (e) {
    next(e);
  }
};
