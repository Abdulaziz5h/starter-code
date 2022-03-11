import { createAction, props } from '@ngrx/store';
import { IUser } from '@app/_models/IUser.interface';
import { UserActionsTypes } from './users-actions-types';

export const getAllUsers = createAction(UserActionsTypes.getAllUsers);
export const getAllUsersSuccess = createAction(
  UserActionsTypes.getAllUsersSuccess,
  props<{ users: { [key: string]: IUser } }>()
);

export const signup = createAction(
  UserActionsTypes.signup,
  props<{ id?: string, questions?: [], answers?: {}, name: string; avatarURL: string }>()
);
export const signupSuccess = createAction(
  UserActionsTypes.signupSuccess,
  props<{ user: IUser }>()
);
export const signupFail = createAction(UserActionsTypes.signupFail);

export const setNewQuestionAnswer = createAction(
  UserActionsTypes.setNewQuestionAnswer,
  props<{
    questionAns: {
      answer: string;
      authedUser: string;
      qid: string;
    };
  }>()
);
export const userAddQuestion = createAction(
  UserActionsTypes.userAddQuestion,
  props<{ qId: string; userId: string }>()
);
