import { LoadingService } from './../views/layout/loading/loading.service';
import { AnswerType } from './../_enum/answerType.enum';
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

@Injectable()
export class UserService {
  _users: { [key: string]: IUser } = {};
  userSubject: Subject<IUser | null> = new Subject<IUser | null>();
  user!: IUser;
  constructor(
    private router: Router,
    private _as: AlertService,
    private _ls: LoadingService
  ) {}
  get users(): Array<IUser> {
    return <Array<IUser>>Object.keys(this._users).map((k) => this._users[k]);
  }
  async fetchUsers() {
    this._ls.reset();
    if (!this.users.length) {
      return fetchUsers().then((data) => {
        this._ls.loaded(100);
        this._users = data;
        return this.users;
      });
    } else {
      return new Promise((res, rej) => {
        this._ls.loaded(100);
        res(this.users);
      });
    }
  }
  getUserById(id: string) {
    return this._users[id];
  }
  updateUserAnsers(q: { authedUser: string; qId: string; ans: string }) {
    this._users[q.authedUser] = {
      ...this._users[q.authedUser],
      answers: {
        ...this._users[q.authedUser].answers,
        [q.qId]: <AnswerType>q.ans,
      },
    };
    this.user = this._users[q.authedUser];
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
        message: 'logged out successfully!',
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
