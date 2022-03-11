import { Observable } from 'rxjs';
import { getCurrentUser } from '@app/store/auth/selector';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { IUser } from '@app/_models/IUser.interface';
import { AnswerType } from '@app/_enum/answerType.enum';
import { IQuestion } from '@app/_models/IQuestion.interface';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCardComponent {
  @Input() question!: IQuestion;
  @Input() author: Observable<IUser> = new Observable<IUser>();
  @Input() isAction: boolean = false;
  @Input() isAnswered: boolean = false;
  @Output() viewPoll: EventEmitter<string> = new EventEmitter<string>();
  answerType = AnswerType;
  user: IUser = <IUser>{};
  form: FormGroup = new FormGroup({
    answerType: new FormControl(AnswerType.optionOne),
  });

  constructor(private store: Store<AppState>) {
    this.store.select(getCurrentUser).subscribe((user) => {
      this.user = <IUser>user;
    });
  }

  viewPollClick() {
    this.viewPoll.emit(
      !this.isAction ? this.question.id : this.form.value.answerType
    );
  }
  isSelected(option: AnswerType) {
    return this.user.answers[this.question.id] == option;
  }
}
