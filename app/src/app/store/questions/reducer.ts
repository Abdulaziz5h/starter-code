import { AnswerType } from '@app/_enum/answerType.enum';
import {
  newQuestionSuccess,
  fetchQuestionsSuccess,
  saveQuestionAnswerSuccess,
} from './actions';
import { questionState, QuestionState } from './state';
import { createReducer, Action, on } from '@ngrx/store';

const _questionsReducer = createReducer(
  questionState,
  on(fetchQuestionsSuccess, (state, { _questions }) => {
    return {
      ...state,
      _questions: {
        ..._questions,
      },
    };
  }),
  on(newQuestionSuccess, (state, { question }) => {
    return {
      ...state,
      _questions: {
        [question.id]: question,
        ...state._questions,
      },
    };
  }),
  on(saveQuestionAnswerSuccess, (state, { questionAns }) => {
    return {
      ...state,
      _questions: {
        ...state._questions,
        [questionAns.qid]: {
          ...state._questions[questionAns.qid],
          [<AnswerType>questionAns.answer]: {
            ...state._questions[questionAns.qid][
              <AnswerType>questionAns.answer
            ],
            votes: [
              ...(state._questions[questionAns.qid][
                <AnswerType>questionAns.answer
              ].votes || []),
              questionAns.authedUser,
            ],
          },
        },
      },
    };
  })
);

export function questionsReducer(state: QuestionState, action: Action): any {
  return _questionsReducer(state, action);
}
