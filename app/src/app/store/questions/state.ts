import { IQuestion } from '@app/_models/IQuestion.interface';
export interface QuestionState {
  _questions: { [key: string]: IQuestion };
}

export const questionState: QuestionState = {
  _questions: {},
};
