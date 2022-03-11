import { IUser } from '@app/_models/IUser.interface';
export interface AuthState {
  user: IUser | null;
}
export const authState: AuthState = {
  user: null,
};
