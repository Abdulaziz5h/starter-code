import { UserService } from '@app/services/user.service';
import { AnswerType } from './../_enum/answerType.enum';
import { IQuestion } from './../_models/IQuestion';
import {
  fetchQuestions,
  saveQuestion,
  saveQuestionAnswer,
} from '@app/_actions/question.action';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private _us: UserService) {}
  _questions: { [key: string]: IQuestion } = {};
  get questions(): IQuestion[] {
    return <Array<IQuestion>>(
      Object.keys(this._questions).map((k) => this._questions[k])
    );
  }
  async fetchQuestions() {
    if (!this.questions.length) {
      return fetchQuestions().then((data) => {
        this._questions = data;
        return this.questions;
      });
    } else {
      return new Promise((res, rej) => {
        res(this.questions);
      });
    }
  }
  getQuestionById(id: string) {
    return this._questions[id];
  }
  saveQuestion(question: {
    optionOneText: string;
    optionTwoText: string;
    author: string;
  }): any {
    return saveQuestion(question).then((data: IQuestion) => {
      this._questions = {
        [data.id]: data,
        ...this._questions,
      };
    });
  }
  saveQuestionAnswer(question: {
    authedUser: string;
    qid: string;
    answer: string;
  }) {
    return saveQuestionAnswer(question).then((data) => {
      const answers =
        this._questions[question.qid][<AnswerType>question.answer];
      answers.votes = [question.authedUser, ...answers.votes!];
      this._us.updateUserAnsers({
        authedUser: question.authedUser,
        ans: question.answer,
        qId: question.qid,
      });
    });
  }
}
