import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    // Get token from Bearer [token]
    const token = authorizationHeader?.split(' ')[1];
    if (!token) {
      throw createError.Unauthorized('Empty token');
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log('decoded', decoded);
    next();
  } catch (err) {
    throw createError.Unauthorized('Unauthorized');
  }
}