export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type UserDataResponse = Omit<UserAttributes, "password" | "isDeleted" | "createdAt" | "updatedAt">;
