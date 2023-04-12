const sequelize = require('../models/database/connection');
const User = require('../models/user.model');

const getUser = async (req, res, next) => {
  try {
    // Test connection
    await sequelize.authenticate();
    // Get all users
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  getUser
}