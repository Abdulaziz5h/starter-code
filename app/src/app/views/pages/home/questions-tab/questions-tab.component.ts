import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { IUser } from '@app/_models/IUser';
import { IQuestion } from '@app/_models/IQuestion';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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

  constructor(private _us: UserService, private router: Router) {
    this._us.fetchUsers().then((users) => {
      this.users = <IUser[]>users;
    });
  }
  getAuthor(authorId: string): IUser {
    return this._us.getUserById(authorId);
  }
  details(qId: string) {
    this.router.navigate(['/questions/' + qId]);
  }
}
