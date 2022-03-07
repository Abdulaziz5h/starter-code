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
  user: Subject<IUser | null> = new Subject<IUser | null>();
  constructor(private router: Router) {}
  get users(): Array<IUser> {
    return <Array<IUser>>Object.keys(this._users).map((k) => this._users[k]);
  }
  fetchUsers() {
    try {
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
    } catch (error: any) {
      throw new Error(error);
    }
  }
  login(userId: any) {
    _login(<IUser>this._users[userId]).then(() => {
      this.getCurrestUser();
      this.router.navigate(['/']);
    });
  }
  logout() {
    _logout().then(() => {
      this.router.navigate(['/login']);
      this.user.next(null);
    });
  }
  getCurrestUser() {
    const user = _getCurrestUser();
    this.user.next(<IUser>JSON.parse(<string>user));
  }
  isLoggedIn() {
    return !!_getCurrestUser();
  }
}
