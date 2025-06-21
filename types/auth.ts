import { User } from "./user";

export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  user?: AuthUser;
}
