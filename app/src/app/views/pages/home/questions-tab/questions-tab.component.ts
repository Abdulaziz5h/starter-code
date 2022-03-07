import { UserService } from '@app/services/user.service';
import { IUser } from '@app/_models/IUser';
import { IQuestion } from '@app/_models/IQuestion';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

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

  constructor(private _us: UserService) {
    this._us.fetchUsers().then((users) => {
      this.users = <IUser[]>users;
    });
  }

  getAuthor(authorId: string): IUser {
    return <IUser>this.users.find((u) => u.id == authorId);
  }
}
