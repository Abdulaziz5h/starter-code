export const QUESTIONS_STATE_NAME = 'questions';
import { QuestionState } from './state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getQuestionState =
  createFeatureSelector<QuestionState>(QUESTIONS_STATE_NAME);

export const getQuestions = createSelector(getQuestionState, (state) =>
  Object.keys(state._questions).map((k) => state._questions[k])
);

export const getQuestionById = (props: { id: string }) =>
  createSelector(getQuestionState, (state) => {
    if (props.id) return state._questions[props.id];
    else return false;
  });
