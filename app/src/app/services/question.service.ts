import { IQuestion } from './../_models/IQuestion';
import { fetchQuestions, saveQuestion } from '@app/_actions/question.action';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
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
  saveQuestion(question: {
    optionOneText: string;
    optionTwoText: string;
    author: string;
  }): any {
    return saveQuestion(question).then((data: IQuestion) => {
      console.log(data);
      this._questions = {
        [data.id]: data,
        ...this._questions,
      };
    });
  }
}
