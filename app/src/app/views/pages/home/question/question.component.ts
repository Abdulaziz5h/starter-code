import { Observable } from 'rxjs';
import { getUserById } from './../../../../store/users/selectors';
import { getCurrentUser } from '@app/store/auth/selector';
import { getQuestionById } from '@app/store/questions/selectors';
import { Store } from '@ngrx/store';
import { IUser } from '../../../../_models/IUser.interface';
import { IQuestion } from '@app/_models/IQuestion.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '@app/store/app.state';
import { saveQuestionAnswer } from '@app/store/questions/actions';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  user$: Observable<IUser> = <Observable<IUser>>{};
  currentUser: IUser = <IUser>{};
  question: IQuestion = <IQuestion>{};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(getCurrentUser).subscribe((user) => {
      this.currentUser = <IUser>user;
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('question_id');
      this.store
        .select(getQuestionById({ id: <string>id }))
        .subscribe((question) => {
          if (question) {
            this.question = {
              ...question,
              optionOne: {
                ...question.optionOne,
                votes: [...(question.optionOne.votes || [])],
              },
              optionTwo: {
                ...question.optionTwo,
                votes: [...(question.optionTwo.votes || [])],
              },
            };
            this.user$ = <Observable<IUser>>(
              this.store.select(getUserById({ id: question.author }))
            );
          } else {
            this.go4o4();
          }
        });
    });
  }
  go4o4() {
    this.router.navigate(['/page-not-found']);
  }
  saveAnswer(ans: string) {
    this.store.dispatch(
      saveQuestionAnswer({
        questionAns: {
          answer: ans,
          authedUser: this.currentUser.id,
          qid: this.question.id,
        },
      })
    );
  }
  isAnswered(qId: string) {
    return !!this.currentUser?.answers[qId];
  }
}
