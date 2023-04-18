import User from '../models/user.model';
import createError from 'http-errors';

class UserService {
  static async getAllUser() {
    try {
      const users = await User.findAll();
      if (!users.length) {
        throw createError.BadRequest('Can not found any user!');
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(name: string, email: string, password: string) {
    try {
      const doesExist = await User.findOne({ where: { name } });
      if (doesExist) {
        throw createError.Conflict(`${email} already exists`);
      }
      const user = await User.create({ name, email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByQuery(object_query: any) {
    try {
      if (!object_query || typeof object_query !== 'object') {
        throw createError.BadRequest('Invalid query object');
      }
      const user = await User.findAll({
        where: object_query
      });
      if (!user) {
        throw createError.BadRequest('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw createError.BadRequest('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw createError.BadRequest('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserById(id: number, payload: any) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw createError.BadRequest('User not found');
      }
      // update the user with the new data
      user.name = payload.name ?? user.name;
      user.email = payload.email ?? user.email;
      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserById(id: number) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw createError.BadRequest('User not found');
      }
      // update isDeleted for user
      user.isDeleted = true;
      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async removeUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw createError.BadRequest('User not found');
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
