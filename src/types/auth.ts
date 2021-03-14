export interface User {
  username: string;
  name: string;
  isAdmin: boolean;
}

export interface Token {
  user: User;
}
