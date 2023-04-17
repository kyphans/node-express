const _ = require('lodash');
const createError = require('http-errors');
const userService = require('../services/user.service');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id || null;
  console.log('req.params', req.params);
  try {
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const createUser = async (req, res, next) => {
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
