import { getAllUsers } from '@app/store/users/actions';
import { Store } from '@ngrx/store';
import { IUser } from '@app/_models/IUser.interface';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.state';
import { getUsers } from '@app/store/users/selectors';

@Component({
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  _users: Array<IUser> = [];
  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAllUsers());
  }
  ngOnInit() {
    this.store.select(getUsers).subscribe((users) => {
      this._users = users;
    });
  }
  get users() {
    return this._users.sort((a: IUser, b: IUser) => {
      if (
        a.questions.length + Object.keys(a.answers).length <
        b.questions.length + Object.keys(b.answers).length
      )
        return 1;
      else return -1;
    });
  }
  trackById(i: number, q: IUser) {
    return q.id;
  }
}
