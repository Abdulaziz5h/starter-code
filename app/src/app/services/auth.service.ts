import { _login } from '@app/_actions/user.action';
import { Injectable } from '@angular/core';
import { IUser } from '@app/_models/IUser.interface';
const USER_DATA_KEY = 'userData';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  login(id: string) {
    return _login(id);
  }
  saveUserData(user: IUser) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  }
  getUserData() {
    return JSON.parse(<string>localStorage.getItem(USER_DATA_KEY));
  }
  logout() {
    localStorage.removeItem(USER_DATA_KEY);
  }
  isLoggedIn() {}
}
