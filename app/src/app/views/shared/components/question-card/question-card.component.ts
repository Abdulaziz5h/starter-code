import { UserService } from '@app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IUser } from '@app/_models/IUser';
import { AnswerType } from '@app/_enum/answerType.enum';
import { IQuestion } from '@app/_models/IQuestion';
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
  @Input() author!: IUser;
  @Input() isAction: boolean = false;
  @Input() isAnswered: boolean = false;
  @Output() viewPoll: EventEmitter<string> = new EventEmitter<string>();
  answerType = AnswerType;

  form: FormGroup = new FormGroup({
    answerType: new FormControl(AnswerType.optionTwo),
  });

  constructor(private _us: UserService) {}

  viewPollClick() {
    this.viewPoll.emit(
      !this.isAction ? this.question.id : this.form.value.answerType
    );
  }
  isSelected(option: AnswerType) {
    console.log(this._us.user.answers[this.question.id], option)
    return this._us.user.answers[this.question.id] == option;
  }
}
