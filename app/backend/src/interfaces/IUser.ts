export interface IUserWithoutPassword {
  id: number;
  username: string;
  role: string;
  email: string;
}

export default interface IUser extends IUserWithoutPassword {
  password: string;
}
