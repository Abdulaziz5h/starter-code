import { IQuestion } from '@app/_models/IQuestion.interface';
import { createAction, props } from '@ngrx/store';
import { questionActionsTypes } from './question-actions-types';

export const fetchQuestions = createAction(questionActionsTypes.fetchQuestions);
export const fetchQuestionsSuccess = createAction(
  questionActionsTypes.fetchQuestionsSuccess,
  props<{ _questions: { [key: string]: IQuestion } }>()
);
export const fetchQuestionsFail = createAction(
  questionActionsTypes.fetchQuestionsFail
);

export const newQuestion = createAction(
  questionActionsTypes.newQuestion,
  props<{
    question: {
      optionOneText: string;
      optionTwoText: string;
      author: string;
    };
  }>()
);
export const newQuestionSuccess = createAction(
  questionActionsTypes.newQuestionSuccess,
  props<{
    question: IQuestion;
  }>()
);
export const newQuestionFail = createAction(
  questionActionsTypes.newQuestionFail
);
export const saveQuestionAnswer = createAction(
  questionActionsTypes.saveQuestionAnswer,
  props<{
    questionAns: {
      answer: string;
      authedUser: string;
      qid: string;
    };
  }>()
);
export const saveQuestionAnswerSuccess = createAction(
  questionActionsTypes.saveQuestionAnswerSuccess,
  props<{
    questionAns: {
      answer: string;
      authedUser: string;
      qid: string;
    };
  }>()
);
export const saveQuestionAnswerFail = createAction(
  questionActionsTypes.saveQuestionAnswerFail
);
