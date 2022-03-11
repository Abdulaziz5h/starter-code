import { getAllUsers } from '@app/store/users/actions';
import { Observable } from 'rxjs';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IUser } from '@app/_models/IUser.interface';
import { IQuestion } from '@app/_models/IQuestion.interface';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getUserById } from '@app/store/users/selectors';

@Component({
  selector: 'questions-tab',
  templateUrl: './questions-tab.component.html',
  styleUrls: ['./questions-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsTabComponent {
  @Input() type: number = 0;
  @Input() questions: IQuestion[] = [];
  users: IUser[] = [];
  get sortedQuestions() {
    return this.questions.sort((a, b) => {
      if (a.timestamp > b.timestamp) return -1;
      else return 1;
    });
  }
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.dispatch(getAllUsers());
  }
  getAuthor(authorId: string): Observable<IUser> {
    return <Observable<IUser>>this.store.select(getUserById({ id: authorId }));
  }
  details(qId: string) {
    this.router.navigate(['/questions/' + qId]);
  }
  trackById(i: number, q: IQuestion) {
    return q.id;
  }
}
