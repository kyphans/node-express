import User from '../models/user.model';

class UserService {
  static async getAllUser() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(name: string, email: string, password: string) {
    try {
      const user = await User.create({ name, email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByQuery(object_query: any) {
    try {
      if (!object_query || typeof object_query !== 'object') {
        throw new Error('Invalid query object');
      }
      const user = await User.findAll({
        where: object_query
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserById(id: number, name: string, email: string, password: string) {
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

  static async deleteUserById(id: number) {
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

export default UserService;
