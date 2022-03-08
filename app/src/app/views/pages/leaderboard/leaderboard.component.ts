import { IUser } from './../../../_models/IUser';
import { UserService } from '@app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  _users: Array<IUser> = [];
  constructor(private _us: UserService) {}
  ngOnInit() {
    this._us.fetchUsers().then((data) => {
      this._users = <IUser[]>data;
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
}
