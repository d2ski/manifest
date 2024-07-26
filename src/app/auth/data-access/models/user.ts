import { AuthModel } from 'pocketbase';

export type User = {
  isValid: boolean;
  token: string;
  authModel: AuthModel | null;
};
