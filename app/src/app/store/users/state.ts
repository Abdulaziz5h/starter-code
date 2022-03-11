import { IUser } from '@app/_models/IUser.interface';
export interface UserState {
  _users: { [key: string]: IUser };
}
export const userState: UserState = {
  _users: {}
};
