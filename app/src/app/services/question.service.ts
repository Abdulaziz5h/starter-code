import { LoadingService } from './../views/layout/loading/loading.service';
import { UserService } from '@app/services/user.service';
import { AnswerType } from '@app/_enum/answerType.enum';
import { IQuestion } from '@app/_models/IQuestion';
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
  constructor(private _us: UserService, private _ls: LoadingService) {}
  _questions: { [key: string]: IQuestion } = {};
  get questions(): IQuestion[] {
    return <Array<IQuestion>>(
      Object.keys(this._questions).map((k) => this._questions[k])
    );
  }
  async fetchQuestions() {
    this._ls.reset();
    if (!this.questions.length) {
      return fetchQuestions().then((data) => {
        this._ls.loaded(100);
        this._questions = data;
        return this.questions;
      });
    } else {
      return new Promise((res, rej) => {
        this._ls.loaded(100);
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
    this._ls.reset();
    return saveQuestion(question).then((data: IQuestion) => {
      this._ls.loaded(100);
      this._questions = {
        [data.id]: data,
        ...this._questions,
      };
      return data;
    });
  }
  async saveQuestionAnswer(question: {
    authedUser: string;
    qid: string;
    answer: string;
  }) {
    this._ls.reset();
    return saveQuestionAnswer(question).then((data) => {
      this._ls.loaded(100);
      const answers =
        this._questions[question.qid][<AnswerType>question.answer];
      answers.votes = [question.authedUser, ...answers.votes!];
      this._us.updateUserAnsers({
        authedUser: question.authedUser,
        ans: question.answer,
        qId: question.qid,
      });
      return true;
    });
  }
}
