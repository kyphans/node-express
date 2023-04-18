import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import createError from 'http-errors';
import userService from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  console.log('req.params', req.params);
  try {
    const user = await userService.getUserById(parseInt(id));
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw createError.BadRequest('Body is missing required fields');
    }
    const userDoesExists = await userService.getUserByQuery({email, name});
    if (userDoesExists.length) {
      throw createError.Conflict(`${email} already exists`);
    }
    const user = await userService.createUser(name, email, password);
    res.status(200).send('Create user successfully!'); 
  } catch (e) {
    next(e);
  }
};
