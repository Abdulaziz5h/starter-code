import { IUser } from '@app/_models/IUser';
import { AnswerType } from '@app/_enum/answerType.enum';
import { IQuestion } from '@app/_models/IQuestion';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCardComponent {
  @Input() question!: IQuestion;
  @Input() author!: IUser;

  answerType = AnswerType;

  constructor() {}

  log() {
    console.log('now');
  }
}
