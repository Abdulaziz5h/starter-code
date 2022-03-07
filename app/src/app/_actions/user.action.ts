import { IUser } from './../_models/IUser';
import { _getUsers } from 'src/_DATA.js';

export const UserTokenKey = 'userData';
export const fetchUsers = () => {
  return _getUsers();
};
export const _login = (user: IUser) => {
  try {
    return new Promise((res, rej) => {
      localStorage.setItem(UserTokenKey, JSON.stringify(user));
      res(user);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
export const _logout = () => {
  try {
    return new Promise((res, rej) => {
      localStorage.removeItem(UserTokenKey);
      res(true);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
export const _getCurrestUser = () => {
  return localStorage.getItem(UserTokenKey)
};
