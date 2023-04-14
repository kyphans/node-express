var _ = require('lodash');
const userService = require('../services/user.service');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();
    res.status(200); // move ra xài chung
    res.json(users);
  } catch (e) {
    res.sendStatus(500);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id || null;
  console.log('req.params', req.params);
  try {
    const user = await userService.getUserById(id);
    res.status(200);
    res.json(user);
  } catch (e) {
    res.sendStatus(500);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Body is missing required fields' });
    }
    const isUser = await userService.getUserByEmail(email);
    if (isUser.length) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await userService.createUser(name, email, password);
    res.status(200).json(user); 
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser
};
