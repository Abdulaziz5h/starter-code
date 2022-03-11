import { setAlert } from './../../../store/shared/action';
import { getCurrentUser } from '@app/store/auth/selector';
import { AppState } from '@app/store/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AnswerType } from '@app/_enum/answerType.enum';
import { IUser } from '@app/_models/IUser.interface';
import { fetchQuestions, newQuestion } from '@app/store/questions/actions';
import { getAllUsers } from '@app/store/users/actions';
@Component({
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit {
  answerType = AnswerType;
  user: IUser = <IUser>{};
  questionForm: FormGroup = new FormGroup({
    [AnswerType.optionOne]: new FormControl('', Validators.required),
    [AnswerType.optionTwo]: new FormControl('', Validators.required),
  });
  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAllUsers());
    this.store.dispatch(fetchQuestions());
  }
  ngOnInit() {
    this.store.select(getCurrentUser).subscribe((user) => {
      this.user = <IUser>user;
    });
  }
  saveQuestion(value: any) {
    this.questionForm.setValue({
      [AnswerType.optionOne]:
        this.questionForm.controls[AnswerType.optionOne].value.trim(),
      [AnswerType.optionTwo]:
        this.questionForm.controls[AnswerType.optionTwo].value.trim(),
    });
    if (!this.questionForm.valid) {
      this.store.dispatch(
        setAlert({
          alert: {
            type: 'danger',
            message: 'please make sure that all inputs filled correctly',
            active: true,
          },
        })
      );
      return;
    }
    const question: {
      optionOneText: string;
      optionTwoText: string;
      author: string;
    } = {
      author: this.user.id,
      optionOneText: value[AnswerType.optionOne].trim(),
      optionTwoText: value[AnswerType.optionTwo].trim(),
    };
    this.store.dispatch(newQuestion({ question }));
  }
}
