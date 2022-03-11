import { UserService } from '@app/services/user.service';
import { IQuestion } from '@app/_models/IQuestion.interface';
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
  async fetchQuestions() {
    return fetchQuestions();
  }
  saveQuestion(question: {
    optionOneText: string;
    optionTwoText: string;
    author: string;
  }) {
    return saveQuestion(question);
  }
  async saveQuestionAnswer(question: {
    authedUser: string;
    qid: string;
    answer: string;
  }) {
    return saveQuestionAnswer(question);
  }
}
