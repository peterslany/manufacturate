export interface User {
  isAdmin: boolean;
  name: string;
  username: string;
}

export interface UserDB {
  _id: string;
  isAdmin: boolean;
  name: string;
  passwordHash: string;
}

export type UsersListData = { count: number; users: UserDB[] };
export interface Token {
  user: User;
}
