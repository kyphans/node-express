import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../utils/db';
import { UserAttributes } from './interface/user.interface';

// we're telling the Model that 'id, createdAt, updatedAt' is optional
// when creating an instance of the model (such as using Model.create()).
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'>  {}

class User extends Model<UserAttributes, UserCreationAttributes>{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare isDeleted: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      field: 'is_deleted',
      defaultValue: false, 
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
      // onUpdate: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true // Default is false. When set to true, it creates fields and table names for the model with an underscored format instead of camelCase format.
  }
);

export default User;
