import { getCurrentUser } from '@app/store/auth/selector';
import { Store } from '@ngrx/store';
import { IUser } from '@app/_models/IUser.interface';
import { IQuestion } from '@app/_models/IQuestion.interface';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.state';
import { getQuestions } from '@app/store/questions/selectors';
import { fetchQuestions } from '@app/store/questions/actions';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  type = 0;
  user!: IUser;
  _questionsList: IQuestion[] = [];
  constructor(private store: Store<AppState>) {
    this.store.dispatch(fetchQuestions());
  }
  ngOnInit(): void {
    this.store.select(getQuestions).subscribe((questions) => {
      this._questionsList = questions;
    });
    this.store.select(getCurrentUser).subscribe((user) => {
      this.user = <IUser>user;
    });
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
