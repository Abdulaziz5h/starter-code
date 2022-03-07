import { IUser } from '@app/_models/IUser';
import { UserService } from '@app/services/user.service';
import { IQuestion } from '@app/_models/IQuestion';
import { QuestionsService } from '@app/services/question.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  type = 0;
  user!: IUser;
  _questionsList: IQuestion[] = [];
  constructor(private _qs: QuestionsService, private _us: UserService) {
    this._us.user.subscribe((user) => {
      this.user = <IUser>user;
      this._qs.fetchQuestions().then((questions) => {
        this._questionsList = <IQuestion[]>questions;
      });
    });
  }

  ngOnInit() {
    this._us.getCurrestUser();
  }
  get answeredQuestions() {
    return this._questionsList.filter(
      (q) => Object.keys(this.user.answers).indexOf(q.id) != -1
    );
  }
  get unansweredQuestions() {
    return this._questionsList.filter(
      (q) => Object.keys(this.user.answers).indexOf(q.id) == -1
    );
  }
  setType(v: number) {
    this.type = v;
  }
}
