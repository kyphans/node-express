const User = require('../models/user.model');

class UserService {
  static async getAllUser() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(name, email, password) {
    try {
      const user = await User.create({ name, email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await User.findAll({
        where: { email: email }
    });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserById(id, name, email, password) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
