import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import createError from 'http-errors';
import userService from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('getAllUsers');
    const users = await userService.getAllUser();
    res.status(200).json(users);
  } catch (e) {
    console.log('getAllUsers err');
    next(e);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(parseInt(id));
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    if (_.isEmpty(payload)) {
      throw createError.BadRequest('No Body');
    }
    await userService.updateUserById(parseInt(id), payload);
    res.status(200).json('Update user successfully!');
  } catch (e) {
    next(e);
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await userService.deleteUserById(parseInt(id));
    res.status(200).json('Delete user successfully!');
  } catch (e) {
    next(e);
  }
};

export const removeUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await userService.removeUserById(parseInt(id));
    res.status(200).json('Remove user successfully!');
  } catch (e) {
    next(e);
  }
};