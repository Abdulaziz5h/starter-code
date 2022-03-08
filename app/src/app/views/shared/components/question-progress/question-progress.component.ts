import { AnswerType } from '@app/_enum/answerType.enum';
import { IQuestion } from '@app/_models/IQuestion';
import { Component, Input } from '@angular/core';
import { round10 } from '@app/utils';

@Component({
  selector: 'question-progress',
  templateUrl: './question-progress.component.html',
  styleUrls: ['./question-progress.component.scss'],
})
export class QuestionProgressComponent {
  @Input() question!: IQuestion;
  @Input() option!: AnswerType;
  @Input() isSelected: boolean = false;

  constructor() {}
  getText(option: AnswerType) {
    return (
      this.question[option].votes?.length +
      ' out of ' +
      (this.question[AnswerType.optionOne].votes!.length +
        this.question[AnswerType.optionTwo].votes!.length)
    );
  }
  getProgress(option: AnswerType) {
    return round10(
      (this.question[option].votes!.length /
        (this.question[AnswerType.optionOne].votes!.length +
          this.question[AnswerType.optionTwo].votes!.length)) *
        100,
      -1
    );
  }
}
