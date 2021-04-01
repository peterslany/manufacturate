import { ListData } from "./common";

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

export type UsersListData = ListData<UserDB>;

export interface Token {
  user: User;
}
