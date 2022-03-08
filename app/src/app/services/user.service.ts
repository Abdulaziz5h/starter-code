import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { IUser } from '@app/_models/IUser';
import {
  fetchUsers,
  _login,
  _logout,
  _getCurrestUser,
} from '@app/_actions/user.action';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _users: { [key: string]: IUser } = {};
  userSubject: Subject<IUser | null> = new Subject<IUser | null>();
  user!: IUser;
  constructor(private router: Router, private _as: AlertService) {}
  get users(): Array<IUser> {
    return <Array<IUser>>Object.keys(this._users).map((k) => this._users[k]);
  }
  async fetchUsers() {
    if (!this.users.length) {
      return fetchUsers().then((data) => {
        this._users = data;
        return this.users;
      });
    } else {
      return new Promise((res, rej) => {
        res(this.users);
      });
    }
  }
  login(userId: any) {
    _login(<IUser>this._users[userId]).then(() => {
      this.getCurrestUser();
      this.router.navigate(['/']);
      this._as.alert({
        type: 'success',
        message: 'welcome back! ' + this.user.name,
      });
    });
  }
  logout() {
    _logout().then(() => {
      this.router.navigate(['/login']);
      this.userSubject.next(null);
      this._as.alert({
        type: 'success',
        message: 'logged out successfully!'
      });
    });
  }
  getCurrestUser() {
    const user = _getCurrestUser();
    this.user = <IUser>JSON.parse(<string>user);
    this.userSubject.next(<IUser>JSON.parse(<string>user));
  }
  isLoggedIn() {
    return !!_getCurrestUser();
  }
}
