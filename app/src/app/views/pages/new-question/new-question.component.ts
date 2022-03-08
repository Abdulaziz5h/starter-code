import { AlertService } from './../../../services/alert.service';
import { IAnswer } from './../../../_models/IAnswer';
import { UserService } from '@app/services/user.service';
import { IQuestion } from '@app/_models/IQuestion';
import { QuestionsService } from '@app/services/question.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AnswerType } from '@app/_enum/answerType.enum';
@Component({
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent {
  answerType = AnswerType;
  questionForm: FormGroup = new FormGroup({
    [AnswerType.optionOne]: new FormControl('', Validators.required),
    [AnswerType.optionTwo]: new FormControl('', Validators.required),
  });
  constructor(
    private _qs: QuestionsService,
    private _us: UserService,
    private _as: AlertService
  ) {}

  saveQuestion(value: any) {
    if (this.questionForm.valid) {
      const question: {
        optionOneText: string;
        optionTwoText: string;
        author: string;
      } = {
        author: this._us.user.id,
        optionOneText: value[AnswerType.optionOne],
        optionTwoText: value[AnswerType.optionTwo],
      };
      this._qs.saveQuestion(question);
    } else {
      this._as.alert({
        type: 'danger',
        message: 'please male sure that all iputs filled correctly',
      });
    }
  }
}
