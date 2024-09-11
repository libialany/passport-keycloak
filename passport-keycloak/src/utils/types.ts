import { User } from '../typeorm';

export type UserDetails = {
  keycloakId: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

export type Done = (err: Error, user: User) => void;
