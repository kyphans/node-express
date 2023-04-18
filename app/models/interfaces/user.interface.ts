export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}