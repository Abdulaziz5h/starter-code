import { AnswerType } from '@app/_enum/answerType.enum';
import {
  getAllUsersSuccess,
  signupSuccess,
  setNewQuestionAnswer,
  userAddQuestion,
} from './actions';
import { userState, UserState } from './state';

import { Action, createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

const _userReducer = createReducer(
  userState,
  on(signupSuccess, (state, props) => {
    return {
      ...state,
      _users: { ...state._users, [props.user.id]: props.user },
    };
  }),
  on(getAllUsersSuccess, (state, props) => {
    return {
      ...state,
      _users: { ...props.users },
    };
  }),
  on(setNewQuestionAnswer, (state, { questionAns }) => {
    return {
      ...state,
      _users: {
        ...state._users,
        [questionAns.authedUser]: {
          ...state._users[questionAns.authedUser],
          answers: {
            ...state._users[questionAns.authedUser].answers,
            [questionAns.qid]: <AnswerType>questionAns.answer,
          },
        },
      },
    };
  }),
  on(userAddQuestion, (state, props) => {
    return {
      ...state,
      _users: {
        ...state._users,
        [props.userId]: {
          ...state._users[props.userId],
          questions: [...state._users[props.userId].questions, props.qId],
        },
      },
    };
  })
);

export function usersReducer(state: UserState, action: Action): any {
  return _userReducer(state, action);
}
