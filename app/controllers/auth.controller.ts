import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userService from '../services/user.service';

dotenv.config();
const saltRounds = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw createError.BadRequest('Body is missing required fields');
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    const passwordMatch = await bcrypt.compare(payload.password, user.password);
    if (!passwordMatch) {
      throw createError.Unauthorized('Invalid email or password');
    }
    const { name, email, password } = user;
    // Authorization
    const accessToken = jwt.sign({ name, email, password }, ACCESS_TOKEN_SECRET, {
      expiresIn: "30s"
    });
    res.status(200).json({
      "message": "The password is correct",
      "accessToken": accessToken
    });

  } catch (e) {
    next(e);
  }
};
