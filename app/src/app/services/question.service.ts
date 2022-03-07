import { IQuestion } from './../_models/IQuestion';
import { fetchQuestions } from '@app/_actions/question.action';
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
  fetchQuestions() {
    try {
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
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
